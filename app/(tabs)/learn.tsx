import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORIES, Category } from '../../data/questions';
import { getLearningContent, LearningTopic } from '../../data/learningContent';

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

function CategoryList({ onSelect }: { onSelect: (cat: Category) => void }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Apprendre</Text>
        <Text style={styles.subtitle}>Fiches de revision par theme</Text>
      </View>
      <View style={styles.catList}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={styles.catCard}
            onPress={() => onSelect(cat)}
            activeOpacity={0.8}
          >
            <View style={styles.catCardIconBox}>
              <Ionicons name={CATEGORY_IONICONS[cat]} size={22} color="#6366F1" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.catCardTitle}>{CATEGORY_LABELS[cat]}</Text>
              <Text style={styles.catCardSub}>Fiche de revision</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A5B4FC" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function TopicDetail({ topic, onBack }: { topic: LearningTopic; onBack: () => void }) {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <View style={styles.backBtnInner}>
            <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
            <Text style={styles.backText}>Retour</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.detailIcon}>{topic.icon}</Text>
        <Text style={styles.detailTitle}>{topic.title}</Text>
      </View>

      {/* Introduction */}
      <View style={styles.introCard}>
        <Text style={styles.introText}>{topic.introduction}</Text>
      </View>

      {/* Sections */}
      <View style={styles.sectionGroup}>
        <Text style={styles.groupTitle}>Cours</Text>
        {topic.sections.map((section, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.sectionCard}
            onPress={() => toggleSection(idx)}
            activeOpacity={0.85}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionNum}>
                <Text style={styles.sectionNumText}>{idx + 1}</Text>
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionChevron}>
                {expandedSections.has(idx) ? '▲' : '▼'}
              </Text>
            </View>
            {expandedSections.has(idx) && (
              <Text style={styles.sectionBody}>{section.body}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Key Facts */}
      <View style={styles.sectionGroup}>
        <Text style={styles.groupTitle}>A retenir</Text>
        <View style={styles.factsCard}>
          {topic.keyFacts.map((fact, idx) => (
            <View
              key={idx}
              style={[styles.factRow, idx < topic.keyFacts.length - 1 && styles.factRowBorder]}
            >
              <Text style={styles.factLabel}>{fact.label}</Text>
              <Text style={styles.factValue}>{fact.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Schema */}
      <View style={styles.sectionGroup}>
        <Text style={styles.groupTitle}>Schemas</Text>
        {topic.schema.map((schema, idx) => (
          <View key={idx} style={styles.schemaCard}>
            <Text style={styles.schemaTitle}>{schema.title}</Text>
            {schema.items.map((item, i) => (
              <View key={i} style={styles.schemaItem}>
                <Text style={styles.schemaBullet}>{'•'}</Text>
                <Text style={styles.schemaText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Example */}
      <View style={styles.sectionGroup}>
        <Text style={styles.groupTitle}>Exemple concret</Text>
        <View style={styles.exampleCard}>
          <Text style={styles.exampleEmoji}>💡</Text>
          <Text style={styles.exampleText}>{topic.example}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.sectionGroup}>
        <Text style={styles.groupTitle}>Resume</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>{topic.summary}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default function LearnScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (params.category && CATEGORIES.includes(params.category as Category)) {
      setSelectedCategory(params.category as Category);
    }
  }, [params.category]);

  const topic = selectedCategory ? getLearningContent(selectedCategory) : undefined;

  return (
    <SafeAreaView style={styles.container}>
      {topic ? (
        <TopicDetail topic={topic} onBack={() => setSelectedCategory(null)} />
      ) : (
        <CategoryList onSelect={setSelectedCategory} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  /* Header */
  header: {
    backgroundColor: '#6366F1',
    padding: 24,
    paddingBottom: 28,
  },
  title: { fontSize: 28, fontWeight: '900', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 4 },

  /* Category List */
  catList: { padding: 16, gap: 10 },
  catCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 14,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  catCardIconBox: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center', justifyContent: 'center',
  },
  catCardTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  catCardSub: { fontSize: 12, color: '#94A3B8', marginTop: 2 },


  /* Detail Header */
  detailHeader: {
    backgroundColor: '#6366F1',
    padding: 20,
    paddingTop: 12,
    paddingBottom: 28,
    alignItems: 'center',
  },
  backBtn: { alignSelf: 'flex-start', marginBottom: 12 },
  backBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backText: { fontSize: 14, color: '#FFFFFF', fontWeight: '700' },
  detailIcon: { fontSize: 44, marginBottom: 8 },
  detailTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF', textAlign: 'center' },

  /* Introduction */
  introCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 16,
    marginTop: -12,
    padding: 18,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  introText: { fontSize: 15, color: '#374151', lineHeight: 24 },

  /* Section groups */
  sectionGroup: { paddingHorizontal: 16, marginTop: 8 },
  groupTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#6366F1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 12,
  },

  /* Sections */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionNum: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionNumText: { fontSize: 13, fontWeight: '800', color: '#6366F1' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B', flex: 1 },
  sectionChevron: { fontSize: 11, color: '#A5B4FC' },
  sectionBody: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginTop: 12,
    paddingLeft: 38,
  },

  /* Key Facts */
  factsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  factRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  factRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  factLabel: { fontSize: 13, color: '#6B7280', fontWeight: '600', flex: 1, marginRight: 12 },
  factValue: { fontSize: 13, color: '#1E293B', fontWeight: '700', flex: 1, textAlign: 'right' },

  /* Schema */
  schemaCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  schemaTitle: { fontSize: 14, fontWeight: '800', color: '#4338CA', marginBottom: 10 },
  schemaItem: { flexDirection: 'row', marginBottom: 6, paddingRight: 8 },
  schemaBullet: { fontSize: 14, color: '#818CF8', marginRight: 8, marginTop: 1 },
  schemaText: { fontSize: 13, color: '#374151', lineHeight: 20, flex: 1 },

  /* Example */
  exampleCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  exampleEmoji: { fontSize: 22 },
  exampleText: { fontSize: 14, color: '#78350F', lineHeight: 22, flex: 1 },

  /* Summary */
  summaryCard: {
    backgroundColor: '#DCFCE7',
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  summaryText: { fontSize: 14, color: '#065F46', lineHeight: 22, fontWeight: '500' },
});
