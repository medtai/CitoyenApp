import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuizStore } from '../../store/useQuizStore';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORY_LABELS, Category } from '../../data/questions';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

function scoreColor(pct: number) {
  if (pct >= 80) return '#16A34A';
  if (pct >= 60) return '#2563EB';
  if (pct >= 40) return '#D97706';
  return '#DC2626';
}

function scoreGradient(pct: number): [string, string] {
  if (pct >= 80) return ['#16A34A', '#22C55E'];
  if (pct >= 60) return ['#1E3A8A', '#2563EB'];
  if (pct >= 40) return ['#D97706', '#F59E0B'];
  return ['#DC2626', '#EF4444'];
}

export default function QuizResult() {
  const router = useRouter();
  const { sessions } = useQuizStore();
  const lastSession = sessions[0];
  const previousSessions = sessions.slice(1, 5);

  useEffect(() => {
    if (!lastSession) router.replace('/quiz');
  }, [lastSession]);

  if (!lastSession) return null;

  const { score, total, percentage, duration } = lastSession;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  const getRating = () => {
    if (percentage >= 80) return { label: 'Prêt pour l\'entretien !', icon: 'trophy' as const };
    if (percentage >= 60) return { label: 'Bon niveau, continuez !', icon: 'trending-up' as const };
    if (percentage >= 40) return { label: 'Encore un effort !', icon: 'book' as const };
    return { label: 'Continuez à apprendre', icon: 'leaf' as const };
  };

  const rating = getRating();
  const color = scoreColor(percentage);
  const [grad1, grad2] = scoreGradient(percentage);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Hero score */}
        <LinearGradient colors={[grad1, grad2]} style={styles.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={styles.quizBadge}>
            <Text style={styles.quizBadgeText}>Quiz #{sessions.length}</Text>
          </View>

          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercent}>{percentage}%</Text>
            <Text style={styles.scoreFraction}>{score}/{total}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Ionicons name={rating.icon} size={18} color="rgba(255,255,255,0.9)" />
            <Text style={styles.ratingLabel}>{rating.label}</Text>
          </View>

          <Text style={styles.heroSub}>Taux de réussite</Text>
        </LinearGradient>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={[styles.statNum, { color: '#16A34A' }]}>{score}</Text>
            <Text style={styles.statLabel}>✅ Correctes</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxMid]}>
            <Text style={[styles.statNum, { color: '#DC2626' }]}>{total - score}</Text>
            <Text style={styles.statLabel}>❌ Incorrectes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{minutes}m{seconds < 10 ? '0' : ''}{seconds}s</Text>
            <Text style={styles.statLabel}>⏱ Durée</Text>
          </View>
        </View>

        {/* Score bar */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progression du score</Text>
          <View style={styles.scoreBarBg}>
            <LinearGradient
              colors={[grad1, grad2]}
              style={[styles.scoreBarFill, { width: `${percentage}%` }]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            />
          </View>
          <View style={styles.scoreBarLabels}>
            <Text style={styles.scoreBarStart}>0%</Text>
            <View style={styles.scoreBarThreshold}>
              <Text style={styles.scoreBarThresholdText}>Seuil 60%</Text>
            </View>
            <Text style={styles.scoreBarEnd}>100%</Text>
          </View>
        </View>

        {/* Previous quizzes */}
        {previousSessions.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quiz précédents</Text>
            {previousSessions.map((s, i) => {
              const c = scoreColor(s.percentage);
              const idx = sessions.length - 1 - i;
              return (
                <View key={s.id} style={styles.historyRow}>
                  <View style={[styles.historyNumBadge, { backgroundColor: c + '18' }]}>
                    <Text style={[styles.historyNum, { color: c }]}>#{idx}</Text>
                  </View>
                  <View style={styles.historyInfo}>
                    <View style={styles.historyTop}>
                      <Text style={styles.historyDate}>{formatDate(s.date)}</Text>
                      <Text style={[styles.historyPct, { color: c }]}>{s.percentage}%</Text>
                    </View>
                    <View style={styles.historyBarBg}>
                      <View style={[styles.historyBarFill, { width: `${s.percentage}%`, backgroundColor: c }]} />
                    </View>
                    <Text style={styles.historyScore}>{s.score}/{s.total} correctes</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => router.replace('/quiz')} style={styles.primaryBtn}>
            <LinearGradient colors={['#1E3A8A', '#2563EB']} style={styles.primaryBtnGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Ionicons name="refresh" size={18} color="#FFF" />
              <Text style={styles.primaryBtnText}>Nouveau quiz</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/')} style={styles.secondaryBtn}>
            <Ionicons name="home-outline" size={18} color="#1E3A8A" />
            <Text style={styles.secondaryBtnText}>Accueil</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },

  hero: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 48,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  quizBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 20,
  },
  quizBadgeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },
  scoreCircle: {
    width: 130, height: 130, borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  scorePercent: { fontSize: 36, fontWeight: '800', color: '#FFFFFF' },
  scoreFraction: { fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  ratingLabel: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -20,
    gap: 8,
    marginBottom: 16,
  },
  statBox: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 14, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  statBoxMid: { borderTopWidth: 3, borderTopColor: '#EF4444' },
  statNum: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  statLabel: { fontSize: 11, color: '#6B7280', marginTop: 3, textAlign: 'center' },

  card: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    padding: 18, marginHorizontal: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 14, letterSpacing: 0.3 },

  scoreBarBg: { height: 12, backgroundColor: '#E5E7EB', borderRadius: 6, overflow: 'hidden' },
  scoreBarFill: { height: 12, borderRadius: 6 },
  scoreBarLabels: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  scoreBarStart: { fontSize: 11, color: '#9CA3AF' },
  scoreBarEnd: { fontSize: 11, color: '#9CA3AF' },
  scoreBarThreshold: { alignItems: 'center' },
  scoreBarThresholdText: { fontSize: 10, color: '#6B7280', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1 },

  historyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  historyNumBadge: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  historyNum: { fontSize: 13, fontWeight: '800' },
  historyInfo: { flex: 1, gap: 4 },
  historyTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyDate: { fontSize: 12, color: '#6B7280' },
  historyPct: { fontSize: 15, fontWeight: '800' },
  historyBarBg: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' },
  historyBarFill: { height: 6, borderRadius: 3 },
  historyScore: { fontSize: 11, color: '#9CA3AF' },

  actions: { marginHorizontal: 16, gap: 10, marginTop: 4 },
  primaryBtn: { borderRadius: 16, overflow: 'hidden' },
  primaryBtnGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 17,
  },
  primaryBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  secondaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 16, backgroundColor: '#FFFFFF', borderRadius: 16,
    borderWidth: 1.5, borderColor: '#E2E8F0',
  },
  secondaryBtnText: { color: '#1E3A8A', fontWeight: '700', fontSize: 15 },
});
