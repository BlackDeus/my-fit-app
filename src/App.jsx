import React, { useState } from "react";
import { Home, TrendingUp, Award, User, Plus, CheckCircle, XCircle, LogOut, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Navigation = ({ currentPage, setCurrentPage, isLoggedIn, onLogout }) => {
    if (!isLoggedIn) return null;

    const navItems = [
        { id: 'home', icon: Home, label: 'Головна' },
        { id: 'plans', icon: TrendingUp, label: 'Плани' },
        { id: 'progress', icon: BarChart3, label: 'Прогрес' },
        { id: 'rewards', icon: Award, label: 'Нагороди' },
        { id: 'profile', icon: User, label: 'Профіль' }
    ];

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <TrendingUp className="w-8 h-8" />
                        <span className="text-xl font-bold">FitTracker Demo</span>
                    </div>
                    <div className="flex space-x-1">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                    currentPage === item.id
                                        ? 'bg-white text-blue-600 shadow-md'
                                        : 'hover:bg-white/10'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="hidden md:inline">{item.label}</span>
                            </button>
                        ))}
                        <button
                            onClick={onLogout}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="hidden md:inline">Вихід</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Будь ласка, заповніть всі поля');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Введіть коректну електронну адресу');
            return;
        }

        if (formData.password.length < 6) {
            setError('Пароль повинен містити мінімум 6 символів');
            return;
        }

        const userData = {
            email: formData.email,
            name: formData.name || formData.email.split('@')[0]
        };

        onLogin(userData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <TrendingUp className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">FitTracker Demo</h1>
                    <p className="text-gray-600">Ваш персональний фітнес-помічник</p>
                </div>

                <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 rounded-md transition-all ${
                            isLogin ? 'bg-white shadow-md text-blue-600' : 'text-gray-600'
                        }`}
                    >
                        Вхід
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 rounded-md transition-all ${
                            !isLogin ? 'bg-white shadow-md text-blue-600' : 'text-gray-600'
                        }`}
                    >
                        Реєстрація
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ім'я</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="Введіть ваше ім'я"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                        {isLogin ? 'Увійти' : 'Зареєструватися'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const HomePage = ({ user, workouts }) => {
    const completedToday = workouts.filter(w => {
        const today = new Date().toDateString();
        return w.completedDate && new Date(w.completedDate).toDateString() === today;
    }).length;

    const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 overflow-x-hidden">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Вітаємо, {user.name}! 👋
                </h1>
                <p className="text-gray-600">Готові до нових досягнень?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg min-w-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-3 rounded-lg">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <span className="text-3xl font-bold">{completedToday}</span>
                    </div>
                    <p className="text-blue-100">Тренувань сьогодні</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg min-w-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-3 rounded-lg">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <span className="text-3xl font-bold">{workouts.filter(w => w.completed).length}</span>
                    </div>
                    <p className="text-purple-100">Всього завершено</p>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg min-w-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-3 rounded-lg">
                            <Award className="w-8 h-8" />
                        </div>
                        <span className="text-3xl font-bold">{totalCalories}</span>
                    </div>
                    <p className="text-pink-100">Калорій спалено</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 min-w-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Швидкий старт</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all cursor-pointer min-w-0">
                        <Plus className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">Почати нове тренування</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all cursor-pointer min-w-0">
                        <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">Переглянути прогрес</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PlansPage = ({ plans, setPlans, workouts, setWorkouts }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [newExercise, setNewExercise] = useState({ name: '', reps: '', duration: '' });

    const handleAddExercise = () => {
        if (!newExercise.name || !newExercise.reps || !newExercise.duration) return;

        const updatedPlans = plans.map(plan => {
            if (plan.id === selectedPlan.id) {
                return {
                    ...plan,
                    exercises: [...(plan.exercises || []), { ...newExercise, id: Date.now() }]
                };
            }
            return plan;
        });

        setPlans(updatedPlans);
        setNewExercise({ name: '', reps: '', duration: '' });
        setShowAddExercise(false);
    };

    const handleStartWorkout = (plan) => {
        const newWorkout = {
            // eslint-disable-next-line react-hooks/purity
            id: Date.now(),
            planId: plan.id,
            planName: plan.name,
            completed: false,
            caloriesBurned: 0,
            date: new Date().toISOString()
        };
        setWorkouts([...workouts, newWorkout]);
        alert(`Тренування "${plan.name}" розпочато!`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 overflow-x-hidden">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Плани тренувань</h1>
                <p className="text-gray-600">Оберіть план або створіть власний</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <div key={plan.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all min-w-0">
                        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-6xl">{plan.emoji}</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                            <p className="text-gray-600 mb-4">{plan.description}</p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-semibold mr-2">Повторення:</span>
                                    <span>{plan.reps}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-semibold mr-2">Тривалість:</span>
                                    <span>{plan.duration}</span>
                                </div>
                            </div>

                            {plan.exercises && plan.exercises.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Додаткові вправи:</p>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {plan.exercises.map(ex => (
                                            <li key={ex.id}>• {ex.name} ({ex.reps} повт., {ex.duration})</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleStartWorkout(plan)}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    Почати
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedPlan(plan);
                                        setShowAddExercise(true);
                                    }}
                                    className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showAddExercise && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-x-hidden">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Додати вправу до "{selectedPlan.name}"
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Назва вправи</label>
                                <input
                                    type="text"
                                    value={newExercise.name}
                                    onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Наприклад: Планка"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Кількість повторень</label>
                                <input
                                    type="text"
                                    value={newExercise.reps}
                                    onChange={(e) => setNewExercise({...newExercise, reps: e.target.value})}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Наприклад: 3 підходи"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Тривалість</label>
                                <input
                                    type="text"
                                    value={newExercise.duration}
                                    onChange={(e) => setNewExercise({...newExercise, duration: e.target.value})}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Наприклад: 60 секунд"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowAddExercise(false)}
                                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                            >
                                Скасувати
                            </button>
                            <button
                                onClick={handleAddExercise}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                Додати
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProgressPage = ({ workouts, setWorkouts }) => {
    const [showCalorieInput, setShowCalorieInput] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [calories, setCalories] = useState('');

    const handleSaveCalories = () => {
        if (!calories || !selectedWorkout) return;

        const updatedWorkouts = workouts.map(w =>
            w.id === selectedWorkout.id
                ? { ...w, caloriesBurned: parseInt(calories) }
                : w
        );

        setWorkouts(updatedWorkouts);
        setShowCalorieInput(false);
        setCalories('');
        setSelectedWorkout(null);
    };

    const handleCompleteWorkout = (workoutId, isCompleted) => {
        const updatedWorkouts = workouts.map(w =>
            w.id === workoutId
                ? { ...w, completed: isCompleted, completedDate: isCompleted ? new Date().toISOString() : null }
                : w
        );
        setWorkouts(updatedWorkouts);
    };

    const last7Days = [...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toLocaleDateString('uk-UA', { weekday: 'short' });
    });

    const workoutData = last7Days.map((day, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dayWorkouts = workouts.filter(w => {
            if (!w.completedDate) return false;
            const workoutDate = new Date(w.completedDate);
            return workoutDate.toDateString() === date.toDateString();
        });

        return {
            day,
            workouts: dayWorkouts.length,
            calories: dayWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0)
        };
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 overflow-x-hidden">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Ваш прогрес</h1>
                <p className="text-gray-600">Відстежуйте свої досягнення</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Тренування за тиждень</h3>

                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <BarChart data={workoutData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="day" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                />
                                <Bar dataKey="workouts" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Калорії за тиждень</h3>

                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <LineChart data={workoutData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="day" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                />
                                <Line type="monotone" dataKey="calories" stroke="#8b5cf6" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 min-w-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Історія тренувань</h3>

                <div className="space-y-3">
                    {workouts.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Ще немає тренувань. Почніть своє перше!</p>
                    ) : (
                        workouts.slice().reverse().map(workout => (
                            <div key={workout.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-800">{workout.planName}</h4>
                                        <p className="text-sm text-gray-500">
                                            {new Date(workout.date).toLocaleDateString('uk-UA', {
                                                day: 'numeric',
                                                month: 'long',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        {workout.caloriesBurned > 0 && (
                                            <p className="text-sm text-purple-600 font-semibold mt-1">
                                                🔥 {workout.caloriesBurned} калорій
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {!workout.completed && (
                                            <button
                                                onClick={() => {
                                                    setSelectedWorkout(workout);
                                                    setShowCalorieInput(true);
                                                }}
                                                className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-lg hover:bg-purple-200 transition-all"
                                            >
                                                Додати калорії
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleCompleteWorkout(workout.id, !workout.completed)}
                                            className={`p-2 rounded-lg transition-all ${
                                                workout.completed
                                                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                            }`}
                                        >
                                            <CheckCircle className="w-6 h-6" />
                                        </button>

                                        <button
                                            onClick={() => {
                                                const updatedWorkouts = workouts.filter(w => w.id !== workout.id);
                                                setWorkouts(updatedWorkouts);
                                            }}
                                            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                                        >
                                            <XCircle className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showCalorieInput && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-x-hidden">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Додати калорії</h3>
                        <p className="text-gray-600 mb-4">Скільки калорій ви спалили під час тренування?</p>

                        <input
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none mb-4"
                            placeholder="Наприклад: 300"
                        />

                        <div className="flex space-x-3">
                            <button
                                onClick={() => {
                                    setShowCalorieInput(false);
                                    setCalories('');
                                    setSelectedWorkout(null);
                                }}
                                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                            >
                                Скасувати
                            </button>
                            <button
                                onClick={handleSaveCalories}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                Зберегти
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const RewardsPage = ({ workouts }) => {
    const milestones = [
        { id: 1, name: 'Перші кроки', description: 'Завершіть 1 тренування', threshold: 1, emoji: '🎯' },
        { id: 2, name: 'На старт', description: 'Завершіть 5 тренувань', threshold: 5, emoji: '🏃' },
        { id: 3, name: 'Впевнений старт', description: 'Завершіть 10 тренувань', threshold: 10, emoji: '💪' },
        { id: 4, name: 'Досвідчений', description: 'Завершіть 25 тренувань', threshold: 25, emoji: '🔥' },
        { id: 5, name: 'Професіонал', description: 'Завершіть 50 тренувань', threshold: 50, emoji: '⭐' },
        { id: 6, name: 'Легенда', description: 'Завершіть 100 тренувань', threshold: 100, emoji: '👑' },
    ];

    const completedCount = workouts.filter(w => w.completed).length;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 overflow-x-hidden">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Нагороди та досягнення</h1>
                <p className="text-gray-600">Святкуйте свої успіхи!</p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg min-w-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Ваш прогрес</h2>
                        <p className="text-blue-100">Завершено {completedCount} тренувань</p>
                    </div>
                    <div className="text-6xl">🏆</div>
                </div>

                <div className="mt-6 bg-white/20 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-white h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((completedCount / 100) * 100, 100)}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {milestones.map(milestone => {
                    const isUnlocked = completedCount >= milestone.threshold;
                    const progress = Math.min((completedCount / milestone.threshold) * 100, 100);

                    return (
                        <div key={milestone.id} className={`rounded-2xl p-6 transition-all min-w-0 ${
                            isUnlocked
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg'
                                : 'bg-white border-2 border-dashed border-gray-300'
                        }`}>
                            <div className="text-center mb-4">
                                <div className={`text-6xl mb-3 ${isUnlocked ? '' : 'opacity-30'}`}>
                                    {milestone.emoji}
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? '' : 'text-gray-800'}`}>
                                    {milestone.name}
                                </h3>
                                <p className={`text-sm ${isUnlocked ? 'text-white/90' : 'text-gray-600'}`}>
                                    {milestone.description}
                                </p>
                            </div>

                            {!isUnlocked && (
                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>{completedCount}/{milestone.threshold}</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-blue-600 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {isUnlocked && (
                                <div className="text-center">
                                    <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                                        ✓ Розблоковано
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ProfilePage = ({ user, workouts }) => {
    const totalCompleted = workouts.filter(w => w.completed).length;
    const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const totalWorkouts = workouts.length;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 overflow-x-hidden">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 min-w-0">
                <div className="flex items-center space-x-6 mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 text-center min-w-0">
                        <div className="text-3xl font-bold text-blue-600">{totalWorkouts}</div>
                        <div className="text-sm text-gray-600 mt-1">Всього тренувань</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center min-w-0">
                        <div className="text-3xl font-bold text-green-600">{totalCompleted}</div>
                        <div className="text-sm text-gray-600 mt-1">Завершено</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center min-w-0">
                        <div className="text-3xl font-bold text-purple-600">{totalCalories}</div>
                        <div className="text-sm text-gray-600 mt-1">Калорій</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 text-center min-w-0">
                        <div className="text-3xl font-bold text-orange-600">
                            {totalCompleted > 0 ? Math.round((totalCompleted / totalWorkouts) * 100) : 0}%
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Успішність</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 min-w-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Інформація про акаунт</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ім'я</label>
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.name}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.email}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Дата реєстрації</label>
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                            {new Date().toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function FitnessApp() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');

    const [plans, setPlans] = useState([
        {
            id: 1,
            name: 'Прес',
            description: 'Комплексне тренування для м\'язів живота та кору',
            reps: '3 підходи по 15 разів',
            duration: '20 хвилин',
            emoji: '💪',
            exercises: []
        },
        {
            id: 2,
            name: 'Кардіо',
            description: 'Інтенсивне кардіо для спалювання калорій',
            reps: '5 раундів',
            duration: '30 хвилин',
            emoji: '🏃',
            exercises: []
        },
        {
            id: 3,
            name: 'Силові вправи',
            description: 'Нарощування м\'язової маси та сили',
            reps: '4 підходи по 10-12 разів',
            duration: '45 хвилин',
            emoji: '🏋️',
            exercises: []
        },
        {
            id: 4,
            name: 'Йога',
            description: 'Розтяжка та покращення гнучкості',
            reps: 'Плавні переходи',
            duration: '30 хвилин',
            emoji: '🧘',
            exercises: []
        },
        {
            id: 5,
            name: 'HIIT',
            description: 'Високоінтенсивне інтервальне тренування',
            reps: '8 раундів по 30 сек',
            duration: '25 хвилин',
            emoji: '⚡',
            exercises: []
        },
        {
            id: 6,
            name: 'Ноги та сідниці',
            description: 'Цільове тренування нижньої частини тіла',
            reps: '3 підходи по 12-15 разів',
            duration: '35 хвилин',
            emoji: '🦵',
            exercises: []
        }
    ]);

    const [workouts, setWorkouts] = useState([]);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        setCurrentPage('home');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setCurrentPage('home');
    };

    if (!isLoggedIn) {
        return <AuthPage onLogin={handleLogin} />;
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage user={user} workouts={workouts} />;
            case 'plans':
                return <PlansPage plans={plans} setPlans={setPlans} workouts={workouts} setWorkouts={setWorkouts} />;
            case 'progress':
                return <ProgressPage workouts={workouts} setWorkouts={setWorkouts} />;
            case 'rewards':
                return <RewardsPage workouts={workouts} />;
            case 'profile':
                return <ProfilePage user={user} workouts={workouts} />;
            default:
                return <HomePage user={user} workouts={workouts} />;
        }
    };

    return (
        <>
        <style>{`
            body { overflow-x: hidden; margin: 0; }
            * { box-sizing: border-box; min-width: 0; }
        `}</style>

        <div className="min-h-screen bg-gray-50">
            <Navigation
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
            />
            {renderPage()}
        </div>
        </>
    );
}