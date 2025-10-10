"use client";

import { useState } from "react";
import { Heart, Brain, Apple, Dumbbell, Moon, Sun, Shield, BookOpen, Star, Clock } from "lucide-react";

interface HealthTip {
  id: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'mental-health' | 'prevention' | 'wellness';
  title: string;
  description: string;
  readTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isBookmarked: boolean;
  tags: string[];
}

const mockHealthTips: HealthTip[] = [
  {
    id: '1',
    category: 'nutrition',
    title: 'The Power of Hydration',
    description: 'Learn how proper hydration affects your energy levels, cognitive function, and overall health. Discover the signs of dehydration and how much water you really need.',
    readTime: '3 min read',
    difficulty: 'beginner',
    isBookmarked: false,
    tags: ['hydration', 'energy', 'health']
  },
  {
    id: '2',
    category: 'exercise',
    title: 'Morning Stretching Routine',
    description: 'Start your day right with a simple 10-minute stretching routine that improves flexibility, reduces muscle tension, and boosts your mood.',
    readTime: '5 min read',
    difficulty: 'beginner',
    isBookmarked: true,
    tags: ['stretching', 'morning', 'flexibility']
  },
  {
    id: '3',
    category: 'sleep',
    title: 'Creating the Perfect Sleep Environment',
    description: 'Optimize your bedroom for better sleep quality. Learn about temperature, lighting, and other factors that can significantly improve your rest.',
    readTime: '4 min read',
    difficulty: 'beginner',
    isBookmarked: false,
    tags: ['sleep', 'environment', 'rest']
  },
  {
    id: '4',
    category: 'mental-health',
    title: 'Mindfulness Meditation for Beginners',
    description: 'Discover the basics of mindfulness meditation and how just 5 minutes a day can reduce stress, improve focus, and enhance your overall well-being.',
    readTime: '6 min read',
    difficulty: 'beginner',
    isBookmarked: true,
    tags: ['meditation', 'mindfulness', 'stress-relief']
  },
  {
    id: '5',
    category: 'prevention',
    title: 'Understanding Your Blood Pressure',
    description: 'Learn what blood pressure numbers mean, how to monitor them at home, and lifestyle changes that can help maintain healthy levels.',
    readTime: '7 min read',
    difficulty: 'intermediate',
    isBookmarked: false,
    tags: ['blood-pressure', 'monitoring', 'heart-health']
  },
  {
    id: '6',
    category: 'wellness',
    title: 'Building Healthy Habits',
    description: 'Master the science of habit formation and learn practical strategies to build lasting healthy habits that stick.',
    readTime: '8 min read',
    difficulty: 'intermediate',
    isBookmarked: false,
    tags: ['habits', 'behavior-change', 'wellness']
  }
];

export default function HealthTips() {
  const [tips, setTips] = useState<HealthTip[]>(mockHealthTips);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nutrition': return <Apple className="h-5 w-5" />;
      case 'exercise': return <Dumbbell className="h-5 w-5" />;
      case 'sleep': return <Moon className="h-5 w-5" />;
      case 'mental-health': return <Brain className="h-5 w-5" />;
      case 'prevention': return <Shield className="h-5 w-5" />;
      case 'wellness': return <Heart className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nutrition': return 'text-green-600 bg-green-100';
      case 'exercise': return 'text-blue-600 bg-blue-100';
      case 'sleep': return 'text-purple-600 bg-purple-100';
      case 'mental-health': return 'text-pink-600 bg-pink-100';
      case 'prevention': return 'text-red-600 bg-red-100';
      case 'wellness': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'nutrition': return 'Nutrition';
      case 'exercise': return 'Exercise';
      case 'sleep': return 'Sleep';
      case 'mental-health': return 'Mental Health';
      case 'prevention': return 'Prevention';
      case 'wellness': return 'Wellness';
      default: return category;
    }
  };

  const toggleBookmark = (id: string) => {
    setTips(tips.map(tip => 
      tip.id === id ? { ...tip, isBookmarked: !tip.isBookmarked } : tip
    ));
  };

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const categories = ['all', 'nutrition', 'exercise', 'sleep', 'mental-health', 'prevention', 'wellness'];
  const bookmarkedTips = tips.filter(tip => tip.isBookmarked);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <BookOpen className="mr-3 h-6 w-6 text-emerald-600" />
          Health Tips
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{bookmarkedTips.length} bookmarked</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
              selectedCategory === category
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category !== 'all' && (
              <span className="mr-2">{getCategoryIcon(category)}</span>
            )}
            {category === 'all' ? 'All Tips' : getCategoryLabel(category)}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTips.map((tip) => (
          <div 
            key={tip.id} 
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedTip(tip)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${getCategoryColor(tip.category)}`}>
                {getCategoryIcon(tip.category)}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(tip.id);
                }}
                className={`p-1 rounded ${
                  tip.isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                <Star className={`h-4 w-4 ${tip.isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{tip.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tip.difficulty)}`}>
                  {tip.difficulty}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {tip.readTime}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {tip.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tip Detail Modal */}
      {selectedTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 ${getCategoryColor(selectedTip.category)}`}>
                  {getCategoryIcon(selectedTip.category)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedTip.title}</h3>
                  <p className="text-sm text-gray-500">{getCategoryLabel(selectedTip.category)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedTip.id)}
                  className={`p-2 rounded ${
                    selectedTip.isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                  }`}
                >
                  <Star className={`h-5 w-5 ${selectedTip.isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => setSelectedTip(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(selectedTip.difficulty)}`}>
                  {selectedTip.difficulty}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedTip.readTime}
                </span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{selectedTip.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedTip.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
