import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useQuizStore } from '../../store/useQuizStore';
import { CATEGORY_LABELS, Category } from '../../data/questions';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(s: number) {
  return `${Math.floor(s / 60)}m ${s % 60 < 10 ? '0' : ''}${s % 60}s`;
}

function scoreColor(pct: number) {
  if (pct >= 80) return '#16A34A';
  if (pct >= 60) return '#2563EB';
  if (pct >= 40) return '#D97706';
  return '#DC2626';
}

function scoreGrad(pct: number): [string, string] {
  if (pct >= 80) return ['#16A34A', '#22C55E'];
  if (pct >= 60) return ['#1E3A8A', '#2563EB'];
  if (pct >= 40) return ['#D97706', '#F59E0B'];
  return ['#DC2626', '#EF4444'];
}

function scoreLabel(pct: number) {
  if (pct >= 80) return 'Excellent';
  if (pct >= 60) return 'Bien';
  if (pct >= 40) return 'À améliorer';
  return 'Insuffisant';
}

export default function HistoryScreen() {
  const router = useRouter();
  const { sessions, loadSessions, clearSessions, replayQuiz } = useQuizStore();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => { loadSessions(); }, []);

  const avgScore = sessions.length > 0
    ? Math.round(sessions.reduce((a, s) => a + s.percentage, 0) / sessions.length)
    : 0;
  const bestScore = sessions.length > 0 ? Math.max(...sessions.map((s) => s.percentage)) : 0;
  const uniqueQuestions = sessions
    .filter((s) => !s.replayOfId)
    .reduce((a, s) => a + s.total, 0);
  const replayedQuestions = sessions
    .filter((s) => !!s.replayOfId)
    .reduce((a, s) => a + s.total, 0);

  const handleClear = () => {
    Alert.alert('Effacer l\'historique ?', 'Cette action est irréversible.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Effacer', style: 'destructive', onPress: clearSessions },
    ]);
  };

  const getQuizNum = (sessionId: string) => {
    const idx = sessions.findIndex((s) => s.id === sessionId);
    return idx >= 0 ? sessions.length - idx : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#6366F1', '#818CF8']} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Mes Résultats</Text>
            <Text style={styles.headerSub}>{sessions.length} quiz complété{sessions.length !== 1 ? 's' : ''}</Text>
          </View>
          {sessions.length > 0 && (
            <TouchableOpacity style={styles.clearIconBtn} onPress={handleClear}>
              <Ionicons name="trash-outline" size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          )}
        </View>

        {sessions.length > 0 && (
          <View style={styles.headerStats}>
            <View style={styles.headerStat}>
              <Text style={styles.headerStatNum}>{sessions.length}</Text>
              <Text style={styles.headerStatLabel}>Quiz</Text>
            </View>
            <View style={styles.headerStatDivider} />
            <View style={styles.headerStat}>
              <Text style={styles.headerStatNum}>{avgScore}%</Text>
              <Text style={styles.headerStatLabel}>Moyenne</Text>
            </View>
            <View style={styles.headerStatDivider} />
            <View style={styles.headerStat}>
              <Text style={styles.headerStatNum}>{bestScore}%</Text>
              <Text style={styles.headerStatLabel}>Meilleur</Text>
            </View>
            <View style={styles.headerStatDivider} />
            <View style={styles.headerStat}>
              <View style={styles.questionsStack}>
                <View style={styles.questionsRow}>
                  <Text style={styles.headerStatNum}>{uniqueQuestions}</Text>
                  <View style={styles.qBadgeUnique}><Text style={styles.qBadgeUniqueText}>uniques</Text></View>
                </View>
                {replayedQuestions > 0 && (
                  <View style={styles.questionsRow}>
                    <Text style={styles.headerStatNumSmall}>+{replayedQuestions}</Text>
                    <View style={styles.qBadgeReplay}><Text style={styles.qBadgeReplayText}>rejouées</Text></View>
                  </View>
                )}
              </View>
              <Text style={styles.headerStatLabel}>Questions</Text>
            </View>
          </View>
        )}
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Chart */}
        {sessions.length > 1 && (
          <View style={styles.chartCard}>
            <Text style={styles.cardLabel}>Évolution des scores</Text>
            <View style={styles.chartArea}>
              {sessions.slice(0, 10).reverse().map((s, i) => {
                const [c1, c2] = scoreGrad(s.percentage);
                const h = Math.max(8, (s.percentage / 100) * 90);
                return (
                  <View key={s.id} style={styles.barCol}>
                    <Text style={styles.barPct}>{s.percentage}%</Text>
                    <LinearGradient
                      colors={[c1, c2]}
                      style={[styles.bar, { height: h }]}
                      start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                    />
                    <Text style={styles.barIdx}>#{sessions.length - i}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.chartAxis} />
          </View>
        )}

        {/* Sessions list */}
        <View style={styles.section}>
          {sessions.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <Ionicons name="bar-chart-outline" size={40} color="#CBD5E1" />
              </View>
              <Text style={styles.emptyTitle}>Aucun quiz passé</Text>
              <Text style={styles.emptyText}>Commencez votre premier quiz pour suivre votre progression ici.</Text>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Historique détaillé</Text>
              {sessions.map((session, i) => {
                const quizNum = sessions.length - i;
                const color = scoreColor(session.percentage);
                const [c1, c2] = scoreGrad(session.percentage);
                const isPassing = session.percentage >= 60;

                return (
                  <View key={session.id} style={styles.sessionCard}>
                    {/* Left accent */}
                    <LinearGradient
                      colors={[c1, c2]}
                      style={styles.sessionAccent}
                      start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                    />

                    <View style={styles.sessionBody}>
                      {/* Top row */}
                      <View style={styles.sessionTopRow}>
                        <View style={styles.sessionTitleRow}>
                          <View style={[styles.quizNumBadge, { backgroundColor: color + '15' }]}>
                            <Text style={[styles.quizNumText, { color }]}>Quiz #{quizNum}</Text>
                          </View>
                          <View style={[styles.levelBadge, { backgroundColor: color + '15' }]}>
                            <Text style={[styles.levelBadgeText, { color }]}>{scoreLabel(session.percentage)}</Text>
                          </View>
                          {(session.replayCount ?? 0) > 0 && (
                            <TouchableOpacity
                              style={styles.replayCountBadge}
                              onPress={() => setActiveTooltip(
                                activeTooltip === `${session.id}-replayed` ? null : `${session.id}-replayed`
                              )}
                            >
                              <Ionicons name="refresh" size={10} color="#6366F1" />
                              <Text style={styles.replayCountText}>{session.replayCount}×</Text>
                            </TouchableOpacity>
                          )}
                          {session.replayOfId && (
                            <TouchableOpacity
                              style={styles.replayOfBadge}
                              onPress={() => setActiveTooltip(
                                activeTooltip === `${session.id}-origin` ? null : `${session.id}-origin`
                              )}
                            >
                              <Ionicons name="return-up-back" size={10} color="#0891B2" />
                              <Text style={styles.replayOfText}>
                                Reprise #{getQuizNum(session.replayOfId!) ?? '?'}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                        <Text style={[styles.sessionBigPct, { color }]}>{session.percentage}%</Text>
                      </View>

                      {/* Tooltips */}
                      {activeTooltip === `${session.id}-replayed` && (
                        <View style={styles.tooltipBox}>
                          <Ionicons name="information-circle" size={13} color="#6366F1" />
                          <Text style={styles.tooltipText}>
                            Ce quiz a été rejoué <Text style={{ fontWeight: '800' }}>{session.replayCount} fois</Text>.
                          </Text>
                          <TouchableOpacity onPress={() => setActiveTooltip(null)}>
                            <Ionicons name="close" size={14} color="#94A3B8" />
                          </TouchableOpacity>
                        </View>
                      )}
                      {activeTooltip === `${session.id}-origin` && session.replayOfId && (
                        <View style={[styles.tooltipBox, styles.tooltipBoxCyan]}>
                          <Ionicons name="information-circle" size={13} color="#0891B2" />
                          <Text style={[styles.tooltipText, { color: '#0E7490' }]}>
                            Ce quiz est une reprise du <Text style={{ fontWeight: '800' }}>Quiz #{getQuizNum(session.replayOfId) ?? '?'}</Text>.
                          </Text>
                          <TouchableOpacity onPress={() => setActiveTooltip(null)}>
                            <Ionicons name="close" size={14} color="#94A3B8" />
                          </TouchableOpacity>
                        </View>
                      )}

                      {/* Progress bar */}
                      <View style={styles.sessionBarBg}>
                        <LinearGradient
                          colors={[c1, c2]}
                          style={[styles.sessionBarFill, { width: `${session.percentage}%` }]}
                          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        />
                        {/* 60% threshold marker */}
                        <View style={styles.thresholdLine} />
                      </View>

                      {/* Score fraction */}
                      <View style={styles.sessionMidRow}>
                        <Text style={styles.sessionFraction}>
                          <Text style={{ color: '#16A34A', fontWeight: '700' }}>{session.score}</Text>
                          <Text style={{ color: '#9CA3AF' }}>/{session.total}</Text>
                          <Text style={{ color: '#6B7280' }}> correctes</Text>
                        </Text>
                        <Text style={styles.sessionMeta}>
                          {formatDate(session.date)} · {formatDuration(session.duration)}
                        </Text>
                      </View>

                      {/* Categories + Replay */}
                      <View style={styles.sessionBottomRow}>
                        <View style={styles.tagsRow}>
                          {session.categories.slice(0, 3).map((cat) => (
                            <View key={cat} style={styles.tag}>
                              <Text style={styles.tagText}>{CATEGORY_LABELS[cat as Category] ?? cat}</Text>
                            </View>
                          ))}
                          {session.categories.length > 3 && (
                            <View style={[styles.tag, { backgroundColor: '#F1F5F9' }]}>
                              <Text style={[styles.tagText, { color: '#64748B' }]}>+{session.categories.length - 3}</Text>
                            </View>
                          )}
                        </View>
                        <TouchableOpacity
                          style={[styles.replayBtn, { borderColor: color }]}
                          onPress={() => {
                            if (replayQuiz(session)) router.push('/quiz/session');
                          }}
                        >
                          <Ionicons name="refresh" size={13} color={color} />
                          <Text style={[styles.replayBtnText, { color }]}>Rejouer</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 3 },
  clearIconBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerStats: {
    flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16, padding: 14,
  },
  headerStat: { flex: 1, alignItems: 'center' },
  headerStatNum: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  headerStatNumSmall: { fontSize: 15, fontWeight: '800', color: 'rgba(255,255,255,0.75)' },
  headerStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  headerStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 4 },
  questionsStack: { alignItems: 'center', gap: 3 },
  questionsRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  qBadgeUnique: {
    backgroundColor: 'rgba(99,255,180,0.22)', borderRadius: 6,
    paddingHorizontal: 5, paddingVertical: 1,
  },
  qBadgeUniqueText: { fontSize: 9, fontWeight: '700', color: '#6EFFC0' },
  qBadgeReplay: {
    backgroundColor: 'rgba(251,191,36,0.22)', borderRadius: 6,
    paddingHorizontal: 5, paddingVertical: 1,
  },
  qBadgeReplayText: { fontSize: 9, fontWeight: '700', color: '#FCD34D' },

  chartCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20, margin: 16,
    padding: 18, paddingBottom: 10,
    shadowColor: '#6366F1', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  cardLabel: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 16, letterSpacing: 0.3 },
  chartArea: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 120 },
  barCol: { flex: 1, alignItems: 'center', gap: 4, justifyContent: 'flex-end' },
  barPct: { fontSize: 8, color: '#9CA3AF', fontWeight: '600' },
  bar: { width: '100%', borderRadius: 6 },
  barIdx: { fontSize: 9, color: '#94A3B8', fontWeight: '600' },
  chartAxis: { height: 1, backgroundColor: '#E2E8F0', marginTop: 8 },

  section: { paddingHorizontal: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#94A3B8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 },

  empty: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 32 },
  emptyIcon: {
    width: 80, height: 80, borderRadius: 24,
    backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: '#374151', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#94A3B8', textAlign: 'center', lineHeight: 21 },

  sessionCard: {
    backgroundColor: '#FFFFFF', borderRadius: 18, marginBottom: 12,
    flexDirection: 'row', overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  sessionAccent: { width: 5 },
  sessionBody: { flex: 1, padding: 16, gap: 10 },

  sessionTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sessionTitleRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  quizNumBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  quizNumText: { fontSize: 13, fontWeight: '800' },
  levelBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  levelBadgeText: { fontSize: 11, fontWeight: '700' },
  sessionBigPct: { fontSize: 26, fontWeight: '900' },

  sessionBarBg: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' },
  sessionBarFill: { height: 8, borderRadius: 4 },
  thresholdLine: {
    position: 'absolute', left: '60%', top: 0, bottom: 0,
    width: 1.5, backgroundColor: 'rgba(0,0,0,0.12)',
  },

  sessionMidRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sessionFraction: { fontSize: 13 },
  sessionMeta: { fontSize: 11, color: '#94A3B8' },

  sessionBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, flex: 1 },
  tag: { backgroundColor: '#EEF2FF', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: 10, color: '#4F46E5', fontWeight: '600' },
  replayBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1.5, borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  replayBtnText: { fontSize: 11, fontWeight: '700' },
  replayCountBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#EEF2FF', borderRadius: 8,
    paddingHorizontal: 7, paddingVertical: 3,
  },
  replayCountText: { fontSize: 11, fontWeight: '700', color: '#6366F1' },
  replayOfBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#ECFEFF', borderRadius: 8,
    paddingHorizontal: 7, paddingVertical: 3,
  },
  replayOfText: { fontSize: 11, fontWeight: '700', color: '#0891B2' },
  tooltipBox: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#EEF2FF', borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 7,
    borderLeftWidth: 3, borderLeftColor: '#6366F1',
  },
  tooltipBoxCyan: { backgroundColor: '#ECFEFF', borderLeftColor: '#0891B2' },
  tooltipText: { flex: 1, fontSize: 12, color: '#4338CA', lineHeight: 17 },
});
