import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuizStore } from '../../store/useQuizStore';
import { useEffect } from 'react';
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORIES, Category, getRandomQuestions } from '../../data/questions';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const CATEGORY_IONICONS: Record<Category, keyof typeof Ionicons.glyphMap> = {
  geographie:   'globe-outline',
  histoire:     'time-outline',
  culture:      'book-outline',
  monuments:    'business-outline',
  politique:    'flag-outline',
  institutions: 'git-network-outline',
  europe:       'earth-outline',
  femmes:       'people-outline',
  devoirs:      'clipboard-outline',
  integration:  'hand-left-outline',
  personnel:    'person-outline',
};

function readinessInfo(avg: number) {
  if (avg >= 80) return { label: 'Prêt pour l\'entretien', icon: 'trophy' as const, color: '#10B981' };
  if (avg >= 60) return { label: 'Bon niveau', icon: 'trending-up' as const, color: '#6366F1' };
  if (avg >= 40) return { label: 'En progression', icon: 'book' as const, color: '#F59E0B' };
  return { label: 'Débutant', icon: 'leaf' as const, color: '#94A3B8' };
}

export default function HomeScreen() {
  const router = useRouter();
  const { sessions, loadSessions, startQuiz } = useQuizStore();

  useEffect(() => { loadSessions(); }, []);

  const startCategoryQuiz = (category: Category) => {
    const quizQuestions = getRandomQuestions(20, category);
    if (quizQuestions.length === 0) return;
    startQuiz(quizQuestions);
    router.push('/quiz/session');
  };

  const bestScore = sessions.length > 0 ? Math.max(...sessions.map((s) => s.percentage)) : 0;
  const avgScore  = sessions.length > 0
    ? Math.round(sessions.reduce((acc, s) => acc + s.percentage, 0) / sessions.length)
    : 0;
  const readiness = readinessInfo(avgScore);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* ── HERO HEADER ── */}
        <LinearGradient
          colors={['#6366F1', '#818CF8']}
          style={styles.hero}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          {/* Decorative circles */}
          <View style={styles.heroCircle1} />
          <View style={styles.heroCircle2} />

          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🇫🇷  Naturalisation</Text>
          </View>
          <Text style={styles.heroTitle}>Citoyen Prépa</Text>
          <Text style={styles.heroSub}>Préparez et réussissez votre entretien</Text>

          {/* Floating stat strip */}
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{sessions.length}</Text>
              <Text style={styles.heroStatLabel}>Quiz</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{bestScore}%</Text>
              <Text style={styles.heroStatLabel}>Meilleur</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{avgScore}%</Text>
              <Text style={styles.heroStatLabel}>Moyenne</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ── READINESS CARD ── */}
        <View style={styles.readinessCard}>
          <View style={styles.readinessTop}>
            <View style={[styles.readinessIconBox, { backgroundColor: readiness.color + '18' }]}>
              <Ionicons name={readiness.icon} size={20} color={readiness.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.readinessLabel}>Niveau de préparation</Text>
              <Text style={[styles.readinessTitle, { color: readiness.color }]}>{readiness.label}</Text>
            </View>
            <Text style={[styles.readinessPct, { color: readiness.color }]}>{avgScore}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${avgScore}%` as any, backgroundColor: readiness.color }]} />
          </View>
        </View>

        {/* ── CTA ── */}
        <View style={styles.ctaSection}>
          <Text style={styles.sectionTitle}>Commencer</Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/quiz')} activeOpacity={0.85}>
            <LinearGradient
              colors={['#6366F1', '#818CF8']}
              style={styles.ctaGrad}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
              <View style={styles.ctaIconBox}>
                <Ionicons name="play" size={16} color="#6366F1" />
              </View>
              <View>
                <Text style={styles.ctaTitle}>Quiz aléatoire</Text>
                <Text style={styles.ctaSub}>20 questions · toutes catégories</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" style={{ marginLeft: 'auto' }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ── QUIZ BY CATEGORY ── */}
        <Text style={styles.sectionTitle}>Quiz par thème</Text>
        <View style={styles.quizList}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={styles.quizRow}
              onPress={() => startCategoryQuiz(cat)}
              activeOpacity={0.8}
            >
              <View style={styles.quizRowIconBox}>
                <Ionicons name={CATEGORY_IONICONS[cat as Category]} size={20} color="#6366F1" />
              </View>
              <Text style={styles.quizRowLabel}>{CATEGORY_LABELS[cat as Category]}</Text>
              <Ionicons name="chevron-forward" size={16} color="#A5B4FC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── CATEGORIES ── */}
        <Text style={styles.sectionTitle}>Apprendre par thème</Text>
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={styles.catCard}
                onPress={() => router.push({ pathname: '/learn', params: { category: cat } })}
                activeOpacity={0.82}
              >
                <View style={styles.catIconBox}>
                  <Ionicons name={CATEGORY_IONICONS[cat as Category]} size={26} color="#1E293B" />
                </View>
                <Text style={styles.catLabel}>{CATEGORY_LABELS[cat as Category]}</Text>
              </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  /* Hero */
  hero: {
    paddingHorizontal: 24, paddingTop: 28, paddingBottom: 36,
    overflow: 'hidden',
  },
  heroCircle1: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)', top: -60, right: -40,
  },
  heroCircle2: {
    position: 'absolute', width: 140, height: 140, borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.05)', bottom: 20, left: -30,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
    marginBottom: 14,
  },
  heroBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.3, marginBottom: 6 },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24 },
  heroStats: {
    flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18, padding: 14,
  },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatNum: { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  heroStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 4 },

  /* Readiness */
  readinessCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    margin: 16, marginTop: -18, padding: 16,
    shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12, elevation: 6,
  },
  readinessTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  readinessIconBox: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  readinessLabel: { fontSize: 11, color: '#94A3B8', fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
  readinessTitle: { fontSize: 16, fontWeight: '800', marginTop: 1 },
  readinessPct: { fontSize: 28, fontWeight: '900' },
  progressTrack: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4 },

  /* CTA */
  ctaSection: { paddingHorizontal: 16, marginBottom: 4 },
  sectionTitle: {
    fontSize: 17, fontWeight: '800', color: '#1E293B',
    marginHorizontal: 16, marginTop: 20, marginBottom: 12,
  },
  ctaBtn: { borderRadius: 18, overflow: 'hidden', shadowColor: '#6366F1', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 8 },
  ctaGrad: { flexDirection: 'row', alignItems: 'center', padding: 18, gap: 14 },
  ctaIconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center',
  },
  ctaTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  ctaSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 },

  /* Quiz list */
  quizList: { paddingHorizontal: 16, gap: 6, marginBottom: 8 },
  quizRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quizRowIconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center', justifyContent: 'center',
  },
  quizRowLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1E293B' },

  /* Categories grid */
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 10 },
  catCard: {
    width: '30%', backgroundColor: '#FFFFFF',
    borderRadius: 18, padding: 14, alignItems: 'center',
    shadowColor: '#6366F1', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  catIconBox: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  catLabel: { fontSize: 10, color: '#374151', textAlign: 'center', fontWeight: '700', lineHeight: 14 },
});
