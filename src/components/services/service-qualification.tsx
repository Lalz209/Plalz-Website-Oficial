"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QualificationQuestion, ServicePackage } from '@/lib/types/services';

interface ServiceQualificationProps {
  questions: QualificationQuestion[];
  packages: ServicePackage[];
  serviceName: string;
}

export function ServiceQualification({ questions, packages, serviceName }: ServiceQualificationProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, answer: string, isMultiple: boolean = false) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: [answer] };
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendation = () => {
    // Simple scoring algorithm based on answers
    let score = 0;
    let totalWeight = 0;

    questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      if (userAnswers.length > 0) {
        score += question.weight;
        totalWeight += question.weight;
      }
    });

    const percentage = totalWeight > 0 ? (score / totalWeight) * 100 : 0;

    if (percentage >= 80) {
      return {
        level: 'high',
        package: packages.find(p => p.recommended) || packages[packages.length - 1],
        message: `¡${serviceName} es perfecto para ti! Basado en tus respuestas, recomendamos nuestro paquete premium.`,
        color: 'text-green-600'
      };
    } else if (percentage >= 50) {
      return {
        level: 'medium',
        package: packages.find(p => p.popular) || packages[1] || packages[0],
        message: `${serviceName} puede ser una buena opción para ti. Te recomendamos empezar con nuestro paquete más popular.`,
        color: 'text-blue-600'
      };
    } else {
      return {
        level: 'low',
        package: packages[0],
        message: `${serviceName} podría funcionar para ti, pero quizás necesites una solución más básica o personalizada.`,
        color: 'text-orange-600'
      };
    }
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ?.id]?.length > 0;
  const recommendation = showResults ? getRecommendation() : null;

  if (showResults && recommendation) {
    return (
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-4">
                  Resultados de tu Evaluación
                </CardTitle>
                <div className="text-4xl mb-4">
                  {recommendation.level === 'high' && '🎯'}
                  {recommendation.level === 'medium' && '👍'}
                  {recommendation.level === 'low' && '🤔'}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className={`text-lg font-semibold ${recommendation.color} mb-4`}>
                    {recommendation.message}
                  </p>
                </div>

                {/* Recommended Package */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-center">
                    Paquete Recomendado
                  </h3>
                  <Card className="border-2 border-primary/30">
                    <CardHeader className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CardTitle className="text-xl">{recommendation.package.name}</CardTitle>
                        {recommendation.package.popular && (
                          <Badge className="bg-blue-500">Más Popular</Badge>
                        )}
                        {recommendation.package.recommended && (
                          <Badge className="bg-green-500">Recomendado</Badge>
                        )}
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        €{recommendation.package.price}
                        {recommendation.package.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through ml-2">
                            €{recommendation.package.originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground">{recommendation.package.duration}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center mb-4">{recommendation.package.description}</p>
                      <ul className="space-y-2">
                        {recommendation.package.features.slice(0, 5).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                        {recommendation.package.features.length > 5 && (
                          <li className="text-sm text-muted-foreground text-center">
                            +{recommendation.package.features.length - 5} características más
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    Solicitar Este Paquete
                  </Button>
                  <Button variant="outline" size="lg">
                    Ver Todos los Paquetes
                  </Button>
                  <Button variant="ghost" onClick={resetQuiz}>
                    Repetir Evaluación
                  </Button>
                </div>

                {/* Summary of Answers */}
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-3">Resumen de tus respuestas:</h4>
                  <div className="space-y-2">
                    {questions.map((question, index) => {
                      const userAnswers = answers[question.id] || [];
                      return (
                        <div key={question.id} className="text-sm">
                          <span className="font-medium">{question.question}</span>
                          <div className="text-muted-foreground ml-4">
                            {userAnswers.length > 0 ? userAnswers.join(', ') : 'Sin respuesta'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Es esto para ti?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Responde estas preguntas para descubrir si {serviceName.toLowerCase()} es la solución perfecta para tu negocio
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">
                    Pregunta {currentQuestion + 1} de {questions.length}
                  </Badge>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
                <CardTitle className="text-xl">
                  {currentQ?.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQ?.type === 'radio' && (
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAnswer(currentQ.id, option)}
                        className={`w-full p-4 text-left border rounded-lg transition-all duration-200 hover:border-primary/50 ${
                          answers[currentQ.id]?.includes(option)
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            answers[currentQ.id]?.includes(option)
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {answers[currentQ.id]?.includes(option) && (
                              <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQ?.type === 'checkbox' && (
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAnswer(currentQ.id, option, true)}
                        className={`w-full p-4 text-left border rounded-lg transition-all duration-200 hover:border-primary/50 ${
                          answers[currentQ.id]?.includes(option)
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 border-2 rounded ${
                            answers[currentQ.id]?.includes(option)
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {answers[currentQ.id]?.includes(option) && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={!isAnswered}
                  >
                    {currentQuestion === questions.length - 1 ? 'Ver Resultados' : 'Siguiente'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
} 