import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Trophy, AlertCircle, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ALL_REACT_QUESTIONS = [
  {
    id: 1,
    question: "What is the main purpose of React components?",
    options: [
      { label: "To style web pages", value: "A" },
      { label: "To create reusable UI elements", value: "B" },
      { label: "To handle database operations", value: "C" },
      { label: "To manage server-side logic", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 2,
    question: "What is the difference between functional and class components?",
    options: [
      { label: "Functional components are faster", value: "A" },
      { label: "Class components can use hooks", value: "B" },
      { label: "Functional components are simpler and can use hooks", value: "C" },
      { label: "There is no difference", value: "D" }
    ],
    correctAnswer: "C"
  },
  {
    id: 3,
    question: "What is the purpose of the useEffect hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To handle side effects in functional components", value: "B" },
      { label: "To style components", value: "C" },
      { label: "To create state variables", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 4,
    question: "What is JSX?",
    options: [
      { label: "A JavaScript library", value: "A" },
      { label: "A syntax extension for JavaScript", value: "B" },
      { label: "A CSS framework", value: "C" },
      { label: "A database query language", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 5,
    question: "What is the virtual DOM?",
    options: [
      { label: "A browser extension", value: "A" },
      { label: "A lightweight copy of the actual DOM", value: "B" },
      { label: "A database system", value: "C" },
      { label: "A testing framework", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 6,
    question: "What is the purpose of the useState hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To add state to functional components", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 7,
    question: "What is prop drilling?",
    options: [
      { label: "A way to style components", value: "A" },
      { label: "Passing props through multiple levels of components", value: "B" },
      { label: "A testing technique", value: "C" },
      { label: "A way to create components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 8,
    question: "What is the purpose of React Router?",
    options: [
      { label: "To style components", value: "A" },
      { label: "To handle navigation in React applications", value: "B" },
      { label: "To manage state", value: "C" },
      { label: "To create components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 9,
    question: "What is the purpose of the key prop?",
    options: [
      { label: "To style elements", value: "A" },
      { label: "To help React identify which items have changed", value: "B" },
      { label: "To create new components", value: "C" },
      { label: "To handle events", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 10,
    question: "What is the purpose of React Context?",
    options: [
      { label: "To style components", value: "A" },
      { label: "To share state between components without prop drilling", value: "B" },
      { label: "To create new components", value: "C" },
      { label: "To handle events", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 11,
    question: "What is the purpose of the useRef hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To persist values between renders without causing re-renders", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 12,
    question: "What is the purpose of the useMemo hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To memoize expensive computations", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 13,
    question: "What is the purpose of the useCallback hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To memoize functions to prevent unnecessary re-renders", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 14,
    question: "What is the purpose of the useReducer hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To manage complex state logic", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 15,
    question: "What is the purpose of the useLayoutEffect hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To perform DOM mutations synchronously after all DOM updates", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 16,
    question: "What is the purpose of the useImperativeHandle hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To customize the instance value exposed to parent components", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 17,
    question: "What is the purpose of the useDebugValue hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To display a label for custom hooks in React DevTools", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 18,
    question: "What is the purpose of the useId hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To generate unique IDs that are stable across renders", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 19,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To subscribe to external data sources", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 20,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To inject styles into the DOM before layout effects", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 21,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To defer updating a value until a more urgent update has completed", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 22,
    question: "What is the purpose of the useTransition hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To mark state updates as non-urgent", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 23,
    question: "What is the purpose of the useId hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To generate unique IDs that are stable across renders", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 24,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To subscribe to external data sources", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 25,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To inject styles into the DOM before layout effects", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 26,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To defer updating a value until a more urgent update has completed", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 27,
    question: "What is the purpose of the useTransition hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To mark state updates as non-urgent", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 28,
    question: "What is the purpose of the useId hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To generate unique IDs that are stable across renders", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 29,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To subscribe to external data sources", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 30,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To inject styles into the DOM before layout effects", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 31,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To defer updating a value until a more urgent update has completed", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 32,
    question: "What is the purpose of the useTransition hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To mark state updates as non-urgent", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 33,
    question: "What is the purpose of the useId hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To generate unique IDs that are stable across renders", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 34,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To subscribe to external data sources", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 35,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To inject styles into the DOM before layout effects", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 36,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To defer updating a value until a more urgent update has completed", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 37,
    question: "What is the purpose of the useTransition hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To mark state updates as non-urgent", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 38,
    question: "What is the purpose of the useId hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To generate unique IDs that are stable across renders", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 39,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To subscribe to external data sources", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 40,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To inject styles into the DOM before layout effects", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 41,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To defer updating a value until a more urgent update has completed", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 42,
    question: "What is the purpose of the useTransition hook?",
    options: [
      { label: "To create new components", value: "A" },
      { label: "To mark state updates as non-urgent", value: "B" },
      { label: "To handle side effects", value: "C" },
      { label: "To style components", value: "D" }
    ],
    correctAnswer: "B"
  }
];

const ReactChallenge = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState(ALL_REACT_QUESTIONS);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Shuffle the questions array and take 2 questions
    const shuffled = [...ALL_REACT_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 2));
  }, []);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (questions[Number(questionIndex)].correctAnswer === answer) {
        correct++;
      }
    });
    return correct;
  };

  const getResultFeedback = (score: number) => {
    if (score > 1) {
      return {
        message: "Congratulations! You've passed the React challenge!",
        icon: <Trophy className="h-12 w-12 text-yellow-500" />,
        description: "You've demonstrated a good understanding of React components. Keep up the great work!"
      };
    } else {
      return {
        message: "Keep practicing! You're almost there.",
        icon: <AlertCircle className="h-12 w-12 text-blue-500" />,
        description: "Review the concepts you missed and try again. You need to score more than 1 to pass."
      };
    }
  };

  if (showResults) {
    const score = calculateScore();
    const feedback = getResultFeedback(score);
    
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container px-4 md:px-6 pt-24 pb-16">
          <Card className="max-w-2xl mx-auto glass-card">
            <CardHeader className="text-center">
              {feedback.icon}
              <CardTitle className="text-2xl mt-4">{feedback.message}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-2">{score} / {questions.length}</p>
                  <p className="text-foreground/70">{feedback.description}</p>
                </div>
                <div className="space-y-4 mt-8">
                  {questions.map((q, index) => (
                    <div key={q.id} className="flex items-center gap-3">
                      {answers[index] === q.correctAnswer ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <p className="text-sm">
                        {q.question}
                        {answers[index] !== q.correctAnswer && (
                          <span className="block text-sm text-foreground/70">
                            Correct answer: {q.options.find(opt => opt.value === q.correctAnswer)?.label}
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate('/challenges')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Challenges
              </Button>
              <Button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                className="bg-brand-purple hover:bg-brand-purple/90"
              >
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container px-4 md:px-6 pt-24 pb-16">
        <Card className="max-w-2xl mx-auto glass-card">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/challenges')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <span className="text-sm text-foreground/70">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress 
              value={(currentQuestion + 1) * (100 / questions.length)} 
              className="h-2"
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <CardTitle className="text-xl">
                {questions[currentQuestion].question}
              </CardTitle>
              <RadioGroup
                value={answers[currentQuestion]}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.value} 
                      id={`option-${option.value}`}
                    />
                    <Label htmlFor={`option-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="bg-brand-purple hover:bg-brand-purple/90"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ReactChallenge; 