import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuizStore } from '../../store/useQuizStore';

export default function ProfileScreen() {
  const { sessions, loadSessions, clearSessions } = useQuizStore();

  useEffect(() => {
    loadSessions();
  }, []);

  const totalQuestions = sessions.reduce((a, s) => a + s.total, 0);
  const correctAnswers = sessions.reduce((a, s) => a + s.score, 0);
  const avgScore = sessions.length > 0
    ? Math.round(sessions.reduce((a, s) => a + s.percentage, 0) / sessions.length)
    : 0;
  const bestScore = sessions.length > 0 ? Math.max(...sessions.map((s) => s.percentage)) : 0;

  const level = avgScore >= 80 ? { name: 'Prêt pour l\'entretien', icon: 'trophy' as const, num: 3, color: '#16A34A' }
    : avgScore >= 50 ? { name: 'Intermédiaire', icon: 'trending-up' as const, num: 2, color: '#6366F1' }
    : { name: 'Débutant', icon: 'leaf' as const, num: 1, color: '#D97706' };

  const badges = [
    { id: 'first', label: 'Premier quiz', icon: 'flag' as const, unlocked: sessions.length >= 1 },
    { id: 'five', label: '5 quiz passés', icon: 'star' as const, unlocked: sessions.length >= 5 },
    { id: 'ten', label: '10 quiz passés', icon: 'ribbon' as const, unlocked: sessions.length >= 10 },
    { id: 'pass60', label: 'Score > 60%', icon: 'trending-up' as const, unlocked: bestScore >= 60 },
    { id: 'pass80', label: 'Score > 80%', icon: 'medal' as const, unlocked: bestScore >= 80 },
    { id: 'perfect', label: 'Score parfait', icon: 'diamond' as const, unlocked: bestScore === 100 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#6366F1', '#818CF8']} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={36} color="#FFFFFF" />
          </View>
          <Text style={styles.userName}>Mon Profil</Text>
          <View style={[styles.levelBadge, { backgroundColor: level.color }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name={level.icon} size={16} color="#FFFFFF" />
              <Text style={styles.levelText}>Niveau {level.num} — {level.name}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{sessions.length}</Text>
            <Text style={styles.statLabel}>Quiz passés</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Questions vues</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#16A34A' }]}>{bestScore}%</Text>
            <Text style={styles.statLabel}>Meilleur score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{avgScore}%</Text>
            <Text style={styles.statLabel}>Moyenne</Text>
          </View>
        </View>

        {/* Progression vers l'entretien */}
        <View style={styles.readinessCard}>
          <Text style={styles.readinessTitle}>Préparation à l\'entretien</Text>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${avgScore}%` }]} />
          </View>
          <Text style={styles.readinessSubtext}>
            {avgScore >= 80
              ? '✅ Vous êtes prêt(e) pour l\'entretien de naturalisation !'
              : `Encore ${80 - avgScore}% de progression pour être prêt(e)`}
          </Text>
        </View>

        {/* Badges */}
        <Text style={styles.sectionTitle}>Mes badges</Text>
        <View style={styles.badgesGrid}>
          {badges.map((badge) => (
            <View key={badge.id} style={[styles.badgeCard, !badge.unlocked && styles.badgeLocked]}>
              <View style={[styles.badgeIconBox, !badge.unlocked && styles.badgeIconBoxLocked]}>
                <Ionicons
                  name={badge.unlocked ? badge.icon : 'lock-closed'}
                  size={24}
                  color={badge.unlocked ? '#6366F1' : '#CBD5E1'}
                />
              </View>
              <Text style={[styles.badgeLabel, !badge.unlocked && styles.badgeLabelLocked]}>
                {badge.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.dangerBtn}
            onPress={() => Alert.alert(
              'Réinitialiser ?',
              'Tout votre historique sera effacé.',
              [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Réinitialiser', style: 'destructive', onPress: clearSessions },
              ]
            )}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="trash-outline" size={18} color="#DC2626" />
              <Text style={styles.dangerBtnText}>Réinitialiser ma progression</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    alignItems: 'center',
    padding: 32,
    paddingBottom: 40,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userName: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 10 },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 12,
    marginTop: -18,
    gap: 8,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  statNum: { fontSize: 28, fontWeight: '900', color: '#6366F1' },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  readinessCard: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  readinessTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937', marginBottom: 10 },
  progressBg: { height: 12, backgroundColor: '#E5E7EB', borderRadius: 6, overflow: 'hidden' },
  progressFill: { height: 12, backgroundColor: '#6366F1', borderRadius: 6 },
  readinessSubtext: { fontSize: 13, color: '#6B7280', marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginHorizontal: 16, marginBottom: 12 },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 12, gap: 8 },
  badgeCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  badgeLocked: { backgroundColor: '#F9FAFB', opacity: 0.6 },
  badgeIconBox: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  badgeIconBoxLocked: { backgroundColor: '#F1F5F9' },
  badgeLabel: { fontSize: 10, color: '#374151', textAlign: 'center', fontWeight: '600' },
  badgeLabelLocked: { color: '#9CA3AF' },
  actions: { margin: 16 },
  dangerBtn: {
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  dangerBtnText: { color: '#DC2626', fontWeight: '700', fontSize: 15 },
});
