import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useQuizStore } from '../../store/useQuizStore';
import { CATEGORY_LABELS } from '../../data/questions';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function QuizSession() {
  const router = useRouter();
  const { currentQuestions, currentIndex, answerQuestion, nextQuestion, finishQuiz, saveProgress } = useQuizStore();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = currentQuestions[currentIndex];
  const isLast = currentIndex === currentQuestions.length - 1;
  const progress = ((currentIndex + 1) / currentQuestions.length) * 100;

  if (!question) {
    router.replace('/quiz/result');
    return null;
  }

  // For old questions without correct_answers, find the matching option by substring
  const correctAnswers = (() => {
    if (question.correct_answers && question.correct_answers.length > 0) {
      return question.correct_answers;
    }
    if (question.answer && question.options) {
      const match = question.options.find(
        (opt) => question.answer!.includes(opt) || opt.includes(question.answer!)
      );
      return match ? [match] : [question.answer];
    }
    return question.answer ? [question.answer] : [];
  })();
  const isMulti = question.type === 'multi';
  const isQcm = question.type === 'qcm' || question.type === 'multi';
  const isOpen = question.type === 'open' || question.type === 'list';

  const toggleAnswer = (answer: string) => {
    if (showExplanation) return;
    if (isMulti) {
      // checkboxes — toggle
      setSelectedAnswers(prev =>
        prev.includes(answer) ? prev.filter(a => a !== answer) : [...prev, answer]
      );
    } else {
      // radio — single selection
      setSelectedAnswers([answer]);
    }
  };

  const arraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, i) => val === sortedB[i]);
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) return;
    const isCorrect = arraysEqual(selectedAnswers, correctAnswers);
    answerQuestion(selectedAnswers, isCorrect);
    setShowExplanation(true);
  };

  const handleOpenContinue = () => {
    answerQuestion(correctAnswers, true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswers([]);
    setShowExplanation(false);
    if (isLast) {
      finishQuiz();
      router.replace('/quiz/result');
    } else {
      nextQuestion();
    }
  };

  const handleQuit = () => {
    saveProgress();
    router.back();
  };

  const isAnswerCorrect = showExplanation && arraysEqual(selectedAnswers, correctAnswers);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleQuit} style={styles.quitBtn} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Ionicons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBg}>
            <LinearGradient
              colors={['#6366F1', '#818CF8']}
              style={[styles.progressFill, { width: `${progress}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={styles.progressText}>{currentIndex + 1}/{currentQuestions.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Catégorie */}
        <Text style={styles.category}>{CATEGORY_LABELS[question.category]}</Text>

        {/* Question */}
        <Text style={styles.questionText}>{question.question}</Text>

        {/* Instruction multi vs single */}
        {isQcm && (
          <Text style={styles.instruction}>
            {isMulti ? '☑ Sélectionnez toutes les bonnes réponses' : '○ Sélectionnez une réponse'}
          </Text>
        )}

        {/* Options QCM / multi */}
        {isQcm && question.options && (
          <View style={styles.options}>
            {question.options.map((option, i) => {
              const isSelected = selectedAnswers.includes(option);
              const isCorrectOption = correctAnswers.includes(option);

              let optionStyle: object[] = [styles.option];
              let textStyle: object[] = [styles.optionText];

              if (showExplanation) {
                if (isCorrectOption) {
                  optionStyle.push(styles.optionCorrect);
                  textStyle.push(styles.optionTextCorrect);
                } else if (isSelected && !isCorrectOption) {
                  optionStyle.push(styles.optionWrong);
                  textStyle.push(styles.optionTextWrong);
                }
              } else if (isSelected) {
                optionStyle.push(styles.optionSelected);
              }

              return (
                <TouchableOpacity
                  key={i}
                  style={optionStyle}
                  onPress={() => toggleAnswer(option)}
                  disabled={showExplanation}
                >
                  <View style={styles.optionRow}>
                    {isMulti ? (
                      <View style={[styles.checkbox, isSelected && !showExplanation && styles.checkboxChecked,
                        showExplanation && isCorrectOption && styles.checkboxCorrect,
                        showExplanation && isSelected && !isCorrectOption && styles.checkboxWrong]}>
                        {(isSelected || (showExplanation && isCorrectOption)) && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </View>
                    ) : (
                      <View style={[styles.radio, isSelected && !showExplanation && styles.radioSelected,
                        showExplanation && isCorrectOption && styles.radioCorrect,
                        showExplanation && isSelected && !isCorrectOption && styles.radioWrong]}>
                        {(isSelected || (showExplanation && isCorrectOption)) && (
                          <View style={styles.radioDot} />
                        )}
                      </View>
                    )}
                    <Text style={[textStyle, { flex: 1 }]}>{option}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Bouton valider (qcm/multi) */}
        {isQcm && selectedAnswers.length > 0 && !showExplanation && (
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Valider</Text>
          </TouchableOpacity>
        )}

        {/* Questions ouvertes / liste */}
        {isOpen && (
          <View style={styles.openAnswer}>
            <Text style={styles.openAnswerLabel}>Réponse correcte :</Text>
            <View style={styles.openAnswerBox}>
              <Text style={styles.openAnswerText}>{question.answer}</Text>
            </View>
            {!showExplanation && (
              <TouchableOpacity style={styles.submitBtn} onPress={handleOpenContinue}>
                <Text style={styles.submitBtnText}>J'ai lu la réponse →</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Explication */}
        {showExplanation && (
          <View style={[styles.explanation, isAnswerCorrect ? styles.explanationCorrect : styles.explanationWrong]}>
            <Text style={styles.explanationResult}>
              {isAnswerCorrect ? '✅ Bonne réponse !' : '❌ Mauvaise réponse'}
            </Text>
            {!isAnswerCorrect && correctAnswers.length > 0 && (
              <Text style={styles.explanationCorrectAnswer}>
                Bonne(s) réponse(s) : {correctAnswers.join(', ')}
              </Text>
            )}
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}

        {/* Bouton suivant */}
        {showExplanation && (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>
              {isLast ? 'Voir les résultats →' : 'Question suivante →'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  quitBtn: { padding: 10, borderRadius: 20, backgroundColor: '#F3F4F6', zIndex: 10 },
  progressContainer: { flex: 1, gap: 4 },
  progressBg: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4 },
  progressText: { fontSize: 12, color: '#6B7280', textAlign: 'right' },
  content: { padding: 16 },
  category: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 28,
    marginBottom: 8,
  },
  instruction: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  options: { gap: 12 },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionSelected: { borderColor: '#6366F1', backgroundColor: '#EEF2FF' },
  optionCorrect: { borderColor: '#16A34A', backgroundColor: '#F0FDF4' },
  optionWrong: { borderColor: '#DC2626', backgroundColor: '#FEF2F2' },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  optionText: { fontSize: 15, color: '#1F2937', lineHeight: 22 },
  optionTextCorrect: { color: '#15803D', fontWeight: '600' },
  optionTextWrong: { color: '#B91C1C', fontWeight: '600' },
  // Checkbox (multi)
  checkbox: {
    width: 26, height: 26, borderWidth: 2, borderColor: '#D1D5DB',
    borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF',
  },
  checkboxChecked: { backgroundColor: '#6366F1', borderColor: '#6366F1' },
  checkboxCorrect: { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  checkboxWrong: { backgroundColor: '#DC2626', borderColor: '#DC2626' },
  checkmark: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  // Radio (qcm)
  radio: {
    width: 26, height: 26, borderWidth: 2, borderColor: '#D1D5DB',
    borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF',
  },
  radioSelected: { borderColor: '#6366F1' },
  radioCorrect: { borderColor: '#16A34A' },
  radioWrong: { borderColor: '#DC2626' },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#6366F1' },
  // Submit
  submitBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  // Open questions
  openAnswer: { gap: 12 },
  openAnswerLabel: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  openAnswerBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  openAnswerText: { fontSize: 16, color: '#4338CA', fontWeight: '600', lineHeight: 24 },
  // Explanation
  explanation: { marginTop: 16, borderRadius: 12, padding: 16 },
  explanationCorrect: { backgroundColor: '#F0FDF4', borderLeftWidth: 4, borderLeftColor: '#16A34A' },
  explanationWrong: { backgroundColor: '#FEF2F2', borderLeftWidth: 4, borderLeftColor: '#DC2626' },
  explanationResult: { fontSize: 15, fontWeight: '700', marginBottom: 6, color: '#1F2937' },
  explanationCorrectAnswer: { fontSize: 14, fontWeight: '600', color: '#15803D', marginBottom: 6 },
  explanationText: { fontSize: 14, color: '#374151', lineHeight: 22 },
  // Next button
  nextBtn: {
    marginTop: 20,
    backgroundColor: '#6366F1',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  nextBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
