import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuizStore } from '../../store/useQuizStore';

export default function QuizResult() {
  const router = useRouter();
  const { sessions } = useQuizStore();
  const lastSession = sessions[0];

  if (!lastSession) {
    router.replace('/quiz');
    return null;
  }

  const { score, total, percentage, duration } = lastSession;

  const getRating = () => {
    if (percentage >= 80) return { label: '🏆 Prêt pour l\'entretien !', color: '#16A34A' };
    if (percentage >= 60) return { label: '📈 Bon niveau', color: '#2563EB' };
    if (percentage >= 40) return { label: '📚 Continuez à apprendre', color: '#D97706' };
    return { label: '🌱 Débutant — continuez !', color: '#DC2626' };
  };

  const rating = getRating();
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Score principal */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercent}>{percentage}%</Text>
            <Text style={styles.scoreFraction}>{score}/{total}</Text>
          </View>
          <Text style={[styles.ratingText, { color: rating.color }]}>{rating.label}</Text>
          <Text style={styles.scoreSubtext}>Taux de réussite</Text>
        </View>

        {/* Détails */}
        <View style={styles.detailsRow}>
          <View style={styles.detailCard}>
            <Text style={styles.detailNum}>{score}</Text>
            <Text style={styles.detailLabel}>Correctes</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={[styles.detailNum, { color: '#EF4444' }]}>{total - score}</Text>
            <Text style={styles.detailLabel}>Incorrectes</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailNum}>{minutes}m{seconds}s</Text>
            <Text style={styles.detailLabel}>Durée</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => router.replace('/quiz')}
          >
            <Text style={styles.retryBtnText}>Refaire un quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.homeBtnText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scoreSection: {
    backgroundColor: '#6366F1',
    alignItems: 'center',
    padding: 40,
    paddingBottom: 48,
    margin: 16,
    borderRadius: 24,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginBottom: 16 },
  scorePercent: { fontSize: 28, fontWeight: '700', color: '#6366F1' },
  scoreFraction: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  ratingText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginTop: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  scoreSubtext: { fontSize: 14, color: '#E0E7FF', marginTop: 8 },
  detailsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -20,
    gap: 8,
  },
  detailCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  detailNum: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  detailLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  actions: { margin: 16, gap: 10 },
  retryBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  retryBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  homeBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  homeBtnText: { color: '#374151', fontWeight: '700', fontSize: 16 },
});