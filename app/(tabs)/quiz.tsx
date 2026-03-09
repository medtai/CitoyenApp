import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORIES, getRandomQuestions } from '../../data/questions';
import { useQuizStore } from '../../store/useQuizStore';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const CATEGORY_IONICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  geographie: 'globe-outline',
  histoire: 'time-outline',
  culture: 'book-outline',
  monuments: 'business-outline',
  politique: 'flag-outline',
  institutions: 'git-network-outline',
  europe: 'earth-outline',
  femmes: 'people-outline',
  devoirs: 'clipboard-outline',
  integration: 'hand-left-outline',
  personnel: 'person-outline',
};

export default function QuizScreen() {
  const router = useRouter();
  const { startQuiz, resumeQuiz, discardPending, pendingSession } = useQuizStore();

  const pendingProgress = pendingSession
    ? Math.round((pendingSession.currentIndex / pendingSession.questions.length) * 100)
    : 0;

  const startRandomQuiz = () => {
    const quizQuestions = getRandomQuestions(20);
    startQuiz(quizQuestions);
    router.push('/quiz/session');
  };

  const startCategoryQuiz = (category: string) => {
    const quizQuestions = getRandomQuestions(20, category as any);
    if (quizQuestions.length === 0) {
      Alert.alert('Pas assez de questions', `Aucune question disponible pour cette catégorie.`);
      return;
    }
    startQuiz(quizQuestions);
    router.push('/quiz/session');
  };

  const handleResume = () => {
    resumeQuiz();
    router.push('/quiz/session');
  };

  const handleDiscard = () => {
    Alert.alert(
      'Abandonner le quiz ?',
      'Votre progression sera définitivement perdue.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Abandonner', style: 'destructive', onPress: discardPending },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#6366F1', '#818CF8']} style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons name="help-circle" size={28} color="#FFFFFF" />
            <Text style={styles.title}>Quiz</Text>
          </View>
          <Text style={styles.subtitle}>Testez vos connaissances</Text>
        </LinearGradient>

        {/* Bannière de reprise */}
        {pendingSession && (
          <View style={styles.resumeBanner}>
            <View style={styles.resumeInfo}>
              <Ionicons name="time-outline" size={22} color="#D97706" />
              <View style={styles.resumeTexts}>
                <Text style={styles.resumeTitle}>Quiz en cours — {pendingProgress}% complété</Text>
                <Text style={styles.resumeSubtitle}>
                  Question {pendingSession.currentIndex + 1} / {pendingSession.questions.length}
                </Text>
              </View>
            </View>
            <View style={styles.resumeProgressBg}>
              <View style={[styles.resumeProgressFill, { width: `${pendingProgress}%` }]} />
            </View>
            <View style={styles.resumeActions}>
              <TouchableOpacity style={styles.resumeBtn} onPress={handleResume}>
                <Text style={styles.resumeBtnText}>▶ Reprendre</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.discardBtn} onPress={handleDiscard}>
                <Text style={styles.discardBtnText}>Abandonner</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Quiz aléatoire */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz complet</Text>
          <TouchableOpacity onPress={startRandomQuiz}>
            <LinearGradient
              colors={['#6366F1', '#818CF8']}
              style={styles.mainQuizCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View>
                <Text style={styles.mainQuizTitle}>Quiz aléatoire</Text>
                <Text style={styles.mainQuizSubtitle}>20 questions · Tous les thèmes</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.7)" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Par catégorie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz par thème</Text>
          {CATEGORIES.map((cat) => {
            const count = getRandomQuestions(20, cat).length;
            return (
              <TouchableOpacity
                key={cat}
                style={styles.categoryRow}
                onPress={() => startCategoryQuiz(cat)}
              >
                <View style={styles.categoryIconBox}>
                  <Ionicons name={CATEGORY_IONICONS[cat]} size={20} color="#6366F1" />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{CATEGORY_LABELS[cat]}</Text>
                  <Text style={styles.categoryCount}>{count} question{count > 1 ? 's' : ''} disponibles</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#A5B4FC" />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 24, paddingBottom: 28 },
  title: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 4 },

  resumeBanner: {
    margin: 16,
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FCD34D',
    gap: 12,
  },
  resumeInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  resumeTexts: { flex: 1 },
  resumeTitle: { fontSize: 14, fontWeight: '700', color: '#92400E' },
  resumeSubtitle: { fontSize: 12, color: '#B45309', marginTop: 2 },
  resumeProgressBg: { height: 6, backgroundColor: '#FDE68A', borderRadius: 3, overflow: 'hidden' },
  resumeProgressFill: { height: 6, backgroundColor: '#D97706', borderRadius: 3 },
  resumeActions: { flexDirection: 'row', gap: 10 },
  resumeBtn: {
    flex: 1,
    backgroundColor: '#D97706',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  resumeBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  discardBtn: {
    flex: 1,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  discardBtnText: { color: '#92400E', fontWeight: '600', fontSize: 14 },

  section: { margin: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  mainQuizCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainQuizTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  mainQuizSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  categoryIconBox: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center', justifyContent: 'center',
  },
  categoryInfo: { flex: 1, marginLeft: 12 },
  categoryName: { fontSize: 15, fontWeight: '600', color: '#1F2937' },
  categoryCount: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  loadingText: { fontSize: 16, color: '#6B7280' },
});
