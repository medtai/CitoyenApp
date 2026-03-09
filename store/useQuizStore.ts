import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Question, questions as allQuestions } from '../data/questions';

export interface QuizSession {
  id: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
  duration: number; // en secondes
  categories: string[];
  questionIds: (string | number)[];
  replayCount: number;
  replayOfId?: string; // ID of the original session this is a replay of
  answers: {
    questionId: string;
    userAnswer: string[];
    isCorrect: boolean;
  }[];
}

export interface PendingSession {
  questions: Question[];
  currentIndex: number;
  userAnswers: { questionId: string; userAnswer: string[]; isCorrect: boolean }[];
  startTime: number;
}

export interface QuizState {
  // Session en cours
  currentQuestions: Question[];
  currentIndex: number;
  userAnswers: { questionId: string; userAnswer: string[]; isCorrect: boolean }[];
  startTime: number | null;
  isActive: boolean;

  // Session en attente (quiz quitté en cours)
  pendingSession: PendingSession | null;

  // Historique
  sessions: QuizSession[];

  // Actions
  fetchQuestions: () => Promise<Question[]>;
  startQuiz: (questions: Question[]) => void;
  replayQuiz: (session: QuizSession) => boolean;
  answerQuestion: (answers: string[], isCorrect: boolean) => void;
  nextQuestion: () => void;
  finishQuiz: () => QuizSession;
  saveProgress: () => void;
  resumeQuiz: () => void;
  discardPending: () => void;
  loadSessions: () => Promise<void>;
  clearSessions: () => void;
}

const STORAGE_KEY = '@citoyen_quiz_sessions';
const PENDING_KEY = '@citoyen_quiz_pending';

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuestions: [],
  currentIndex: 0,
  userAnswers: [],
  startTime: null,
  isActive: false,
  pendingSession: null,
  sessions: [],
  replayingFromId: null as string | null,

  fetchQuestions: async () => {
    try {
      const response = await fetch('http://localhost:3000/questions');
      if (!response.ok) throw new Error('Failed to fetch questions');
      const questions: Question[] = await response.json();
      return questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  },

  startQuiz: (questions) => {
    AsyncStorage.removeItem(PENDING_KEY);
    set({
      currentQuestions: questions,
      currentIndex: 0,
      userAnswers: [],
      startTime: Date.now(),
      isActive: true,
      pendingSession: null,
      replayingFromId: null,
    });
  },

  replayQuiz: (session) => {
    const ids = session.questionIds?.length
      ? session.questionIds
      : session.answers.map((a) => a.questionId);
    const qs = ids.map((id) => allQuestions.find((q) => String(q.id) === String(id))).filter(Boolean) as Question[];
    if (qs.length === 0) return false;

    // Increment replayCount on the original session
    const { sessions } = get();
    const updatedSessions = sessions.map((s) =>
      s.id === session.id ? { ...s, replayCount: (s.replayCount ?? 0) + 1 } : s
    );
    set({ sessions: updatedSessions });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));

    AsyncStorage.removeItem(PENDING_KEY);
    set({
      currentQuestions: qs,
      currentIndex: 0,
      userAnswers: [],
      startTime: Date.now(),
      isActive: true,
      pendingSession: null,
      replayingFromId: session.id,
    });
    return true;
  },

  answerQuestion: (answers, isCorrect) => {
    const { currentQuestions, currentIndex, userAnswers } = get();
    const question = currentQuestions[currentIndex];
    set({
      userAnswers: [
        ...userAnswers,
        { questionId: String(question.id), userAnswer: answers, isCorrect },
      ],
    });
  },

  nextQuestion: () => {
    const { currentIndex } = get();
    set({ currentIndex: currentIndex + 1 });
  },

  finishQuiz: () => {
    const { currentQuestions, userAnswers, startTime, sessions, replayingFromId } = get() as any;
    const duration = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    const score = userAnswers.filter((a: any) => a.isCorrect).length;
    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const categories = [...new Set(currentQuestions.map((q: any) => q.category))];

    const session: QuizSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score,
      total,
      percentage,
      duration,
      categories,
      questionIds: currentQuestions.map((q: any) => q.id),
      replayCount: 0,
      ...(replayingFromId ? { replayOfId: replayingFromId } : {}),
      answers: userAnswers,
    };

    const newSessions = [session, ...sessions];
    set({ sessions: newSessions, isActive: false, pendingSession: null, replayingFromId: null });

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
    AsyncStorage.removeItem(PENDING_KEY);

    return session;
  },

  saveProgress: () => {
    const { currentQuestions, currentIndex, userAnswers, startTime } = get();
    if (currentQuestions.length === 0) return;

    const pending: PendingSession = {
      questions: currentQuestions,
      currentIndex,
      userAnswers,
      startTime: startTime ?? Date.now(),
    };

    set({ pendingSession: pending, isActive: false });
    AsyncStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  },

  resumeQuiz: () => {
    const { pendingSession } = get();
    if (!pendingSession) return;

    set({
      currentQuestions: pendingSession.questions,
      currentIndex: pendingSession.currentIndex,
      userAnswers: pendingSession.userAnswers,
      startTime: pendingSession.startTime,
      isActive: true,
      pendingSession: null,
    });

    AsyncStorage.removeItem(PENDING_KEY);
  },

  discardPending: () => {
    set({ pendingSession: null });
    AsyncStorage.removeItem(PENDING_KEY);
  },

  loadSessions: async () => {
    try {
      const [data, pending] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(PENDING_KEY),
      ]);
      if (data) set({ sessions: JSON.parse(data) });
      if (pending) set({ pendingSession: JSON.parse(pending) });
    } catch (e) {
      console.error('Erreur chargement sessions', e);
    }
  },

  clearSessions: () => {
    set({ sessions: [], pendingSession: null });
    AsyncStorage.removeItem(STORAGE_KEY);
    AsyncStorage.removeItem(PENDING_KEY);
  },
}));
