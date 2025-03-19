import React, { useState } from 'react';
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

const ALL_JAVASCRIPT_QUESTIONS = [
  {
    id: 1,
    question: "What is the purpose of the 'let' keyword in JavaScript?",
    options: [
      { label: "To declare a constant variable", value: "A" },
      { label: "To declare a function", value: "B" },
      { label: "To declare a block-scoped variable", value: "C" },
      { label: "To import modules", value: "D" }
    ],
    correctAnswer: "C"
  },
  {
    id: 2,
    question: "Which method is used to add elements to the end of an array?",
    options: [
      { label: "unshift()", value: "A" },
      { label: "push()", value: "B" },
      { label: "append()", value: "C" },
      { label: "add()", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 3,
    question: "What is the output of: typeof null?",
    options: [
      { label: "null", value: "A" },
      { label: "undefined", value: "B" },
      { label: "object", value: "C" },
      { label: "number", value: "D" }
    ],
    correctAnswer: "C"
  },
  {
    id: 4,
    question: "Which operator is used for strict equality comparison?",
    options: [
      { label: "==", value: "A" },
      { label: "===", value: "B" },
      { label: "=", value: "C" },
      { label: "!=", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 5,
    question: "What is a closure in JavaScript?",
    options: [
      { label: "A way to close the browser window", value: "A" },
      { label: "A function that has access to variables in its outer scope", value: "B" },
      { label: "A method to end a loop", value: "C" },
      { label: "A way to close database connections", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 6,
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: [
      { label: "The current HTML document", value: "A" },
      { label: "The object that is executing the current function", value: "B" },
      { label: "The previous function in the call stack", value: "C" },
      { label: "The global window object only", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 7,
    question: "Which method is used to remove the last element from an array?",
    options: [
      { label: "pop()", value: "A" },
      { label: "shift()", value: "B" },
      { label: "slice()", value: "C" },
      { label: "remove()", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 8,
    question: "What is the purpose of Promise in JavaScript?",
    options: [
      { label: "To make the code run faster", value: "A" },
      { label: "To handle asynchronous operations", value: "B" },
      { label: "To create loops", value: "C" },
      { label: "To define classes", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 9,
    question: "What is the correct way to check if a variable is an array?",
    options: [
      { label: "typeof variable === 'array'", value: "A" },
      { label: "variable instanceof Array", value: "B" },
      { label: "Array.isArray(variable)", value: "C" },
      { label: "variable.isArray()", value: "D" }
    ],
    correctAnswer: "C"
  },
  {
    id: 10,
    question: "What is event bubbling in JavaScript?",
    options: [
      { label: "A way to create new events", value: "A" },
      { label: "When an event triggers on a child element and propagates up through its parents", value: "B" },
      { label: "A method to remove event listeners", value: "C" },
      { label: "A type of error handling", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 11,
    question: "What is the difference between 'undefined' and 'null' in JavaScript?",
    options: [
      { label: "They are exactly the same", value: "A" },
      { label: "undefined means a variable is declared but not assigned, null is an explicit assignment", value: "B" },
      { label: "null is a type error, undefined is a valid value", value: "C" },
      { label: "undefined is a type error, null is a valid value", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 12,
    question: "What is the purpose of the 'use strict' directive?",
    options: [
      { label: "To make JavaScript code run faster", value: "A" },
      { label: "To enforce stricter parsing and error handling", value: "B" },
      { label: "To enable new JavaScript features", value: "C" },
      { label: "To disable all JavaScript warnings", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 13,
    question: "What is the output of: console.log(0.1 + 0.2 === 0.3)?",
    options: [
      { label: "true", value: "A" },
      { label: "false", value: "B" },
      { label: "undefined", value: "C" },
      { label: "NaN", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 14,
    question: "What is a callback function?",
    options: [
      { label: "A function that calls itself", value: "A" },
      { label: "A function passed as an argument to another function", value: "B" },
      { label: "A function that returns another function", value: "C" },
      { label: "A function that only runs in the background", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 15,
    question: "What is the purpose of the 'map' array method?",
    options: [
      { label: "To filter out elements from an array", value: "A" },
      { label: "To create a new array with transformed elements", value: "B" },
      { label: "To sort the array elements", value: "C" },
      { label: "To find a specific element in the array", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 16,
    question: "What is the difference between 'let' and 'var'?",
    options: [
      { label: "let is block-scoped, var is function-scoped", value: "A" },
      { label: "var is block-scoped, let is function-scoped", value: "B" },
      { label: "let can be redeclared, var cannot", value: "C" },
      { label: "There is no difference", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 17,
    question: "What is the purpose of JSON.stringify()?",
    options: [
      { label: "To parse JSON strings", value: "A" },
      { label: "To convert JavaScript objects to JSON strings", value: "B" },
      { label: "To validate JSON data", value: "C" },
      { label: "To format JSON data", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 18,
    question: "What is a pure function?",
    options: [
      { label: "A function that only uses pure JavaScript", value: "A" },
      { label: "A function that always returns the same output for the same input and has no side effects", value: "B" },
      { label: "A function that doesn't use any variables", value: "C" },
      { label: "A function that only runs once", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 19,
    question: "What is the purpose of the 'reduce' array method?",
    options: [
      { label: "To remove elements from an array", value: "A" },
      { label: "To accumulate array elements into a single value", value: "B" },
      { label: "To increase array size", value: "C" },
      { label: "To sort array elements", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 20,
    question: "What is the difference between '==' and '==='?",
    options: [
      { label: "They are exactly the same", value: "A" },
      { label: "== checks value only, === checks both value and type", value: "B" },
      { label: "=== checks value only, == checks both value and type", value: "C" },
      { label: "== is invalid in JavaScript", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 21,
    question: "What is hoisting in JavaScript?",
    options: [
      { label: "Moving all variable declarations to the top of their scope", value: "A" },
      { label: "Lifting elements in the DOM", value: "B" },
      { label: "A way to organize code", value: "C" },
      { label: "A type of error handling", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 22,
    question: "What is the purpose of async/await?",
    options: [
      { label: "To make code run faster", value: "A" },
      { label: "To write asynchronous code that looks synchronous", value: "B" },
      { label: "To prevent errors", value: "C" },
      { label: "To create loops", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 23,
    question: "What is the spread operator (...)?",
    options: [
      { label: "An operator that spreads errors", value: "A" },
      { label: "An operator that expands elements", value: "B" },
      { label: "A way to create functions", value: "C" },
      { label: "A type of loop", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 24,
    question: "What is destructuring in JavaScript?",
    options: [
      { label: "Breaking down code into smaller parts", value: "A" },
      { label: "Extracting values from objects or arrays into distinct variables", value: "B" },
      { label: "Removing elements from arrays", value: "C" },
      { label: "Creating new objects", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 25,
    question: "What is the purpose of the 'bind' method?",
    options: [
      { label: "To join two strings", value: "A" },
      { label: "To permanently set the 'this' value for a function", value: "B" },
      { label: "To create new functions", value: "C" },
      { label: "To bind events to elements", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 26,
    question: "What is a generator function in JavaScript?",
    options: [
      { label: "A function that generates random numbers", value: "A" },
      { label: "A function that can be paused and resumed", value: "B" },
      { label: "A function that creates other functions", value: "C" },
      { label: "A function that only runs once", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 27,
    question: "What is the purpose of the 'Set' object?",
    options: [
      { label: "To create arrays", value: "A" },
      { label: "To store unique values of any type", value: "B" },
      { label: "To set variables", value: "C" },
      { label: "To create objects", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 28,
    question: "What is the purpose of the 'Map' object?",
    options: [
      { label: "To transform arrays", value: "A" },
      { label: "To store key-value pairs with any type of key", value: "B" },
      { label: "To create maps for navigation", value: "C" },
      { label: "To map functions to variables", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 29,
    question: "What is a Symbol in JavaScript?",
    options: [
      { label: "A type of variable", value: "A" },
      { label: "A unique and immutable primitive value", value: "B" },
      { label: "A type of function", value: "C" },
      { label: "A mathematical operator", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 30,
    question: "What is the purpose of the 'every' array method?",
    options: [
      { label: "To loop through array elements", value: "A" },
      { label: "To test if all elements pass a condition", value: "B" },
      { label: "To modify all elements", value: "C" },
      { label: "To count elements", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 31,
    question: "What is the purpose of the 'some' array method?",
    options: [
      { label: "To get some elements from an array", value: "A" },
      { label: "To test if at least one element passes a condition", value: "B" },
      { label: "To partially sort an array", value: "C" },
      { label: "To sum array elements", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 32,
    question: "What is a WeakMap?",
    options: [
      { label: "A Map that can only store weak references", value: "A" },
      { label: "A Map where keys must be objects and are weakly referenced", value: "B" },
      { label: "A Map with limited functionality", value: "C" },
      { label: "A Map that can be easily deleted", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 33,
    question: "What is the purpose of the 'Object.freeze()' method?",
    options: [
      { label: "To prevent an object from being modified", value: "A" },
      { label: "To deep freeze an object in memory", value: "B" },
      { label: "To copy an object", value: "C" },
      { label: "To delete an object", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 34,
    question: "What is the purpose of the 'Object.seal()' method?",
    options: [
      { label: "To encrypt an object", value: "A" },
      { label: "To prevent adding/deleting properties but allow modifying existing ones", value: "B" },
      { label: "To create a copy of an object", value: "C" },
      { label: "To merge objects", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 35,
    question: "What is the purpose of the 'new' keyword?",
    options: [
      { label: "To create new variables", value: "A" },
      { label: "To create an instance of a constructor function", value: "B" },
      { label: "To declare new functions", value: "C" },
      { label: "To create new arrays", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 36,
    question: "What is the purpose of the 'instanceof' operator?",
    options: [
      { label: "To check if a variable is defined", value: "A" },
      { label: "To test if an object is an instance of a specific class", value: "B" },
      { label: "To create new instances", value: "C" },
      { label: "To compare instances", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 37,
    question: "What is a closure in JavaScript?",
    options: [
      { label: "A way to close functions", value: "A" },
      { label: "A function that has access to variables in its outer scope", value: "B" },
      { label: "A way to end loops", value: "C" },
      { label: "A type of error", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 38,
    question: "What is event delegation?",
    options: [
      { label: "Assigning events to multiple elements", value: "A" },
      { label: "Handling events at a higher level in the DOM", value: "B" },
      { label: "Creating custom events", value: "C" },
      { label: "Removing event listeners", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 39,
    question: "What is the purpose of the 'void' operator?",
    options: [
      { label: "To create empty variables", value: "A" },
      { label: "To evaluate an expression and return undefined", value: "B" },
      { label: "To delete variables", value: "C" },
      { label: "To check if a value is void", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 40,
    question: "What is the difference between 'for...in' and 'for...of' loops?",
    options: [
      { label: "They are the same", value: "A" },
      { label: "for...in iterates over enumerable properties, for...of iterates over iterable values", value: "B" },
      { label: "for...of is faster than for...in", value: "C" },
      { label: "for...in is used for arrays, for...of for objects", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 41,
    question: "What is the purpose of the 'yield' keyword?",
    options: [
      { label: "To pause execution of functions", value: "A" },
      { label: "To pause and resume generator functions", value: "B" },
      { label: "To return multiple values", value: "C" },
      { label: "To create loops", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 42,
    question: "What is the purpose of the 'Proxy' object?",
    options: [
      { label: "To create network proxies", value: "A" },
      { label: "To customize behavior for basic operations", value: "B" },
      { label: "To hide object properties", value: "C" },
      { label: "To improve performance", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 43,
    question: "What is the purpose of the 'Reflect' API?",
    options: [
      { label: "To create mirrors", value: "A" },
      { label: "To provide methods for interceptable JavaScript operations", value: "B" },
      { label: "To reflect light in WebGL", value: "C" },
      { label: "To copy objects", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 44,
    question: "What is the purpose of the 'requestAnimationFrame' method?",
    options: [
      { label: "To create animations", value: "A" },
      { label: "To schedule a function to run before the next repaint", value: "B" },
      { label: "To pause animations", value: "C" },
      { label: "To cancel animations", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 45,
    question: "What is the purpose of the 'Object.create()' method?",
    options: [
      { label: "To create empty objects", value: "A" },
      { label: "To create an object with a specified prototype", value: "B" },
      { label: "To clone objects", value: "C" },
      { label: "To merge objects", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 46,
    question: "What is the purpose of the 'Object.assign()' method?",
    options: [
      { label: "To assign values to variables", value: "A" },
      { label: "To copy properties from one or more source objects to a target object", value: "B" },
      { label: "To create object references", value: "C" },
      { label: "To compare objects", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 47,
    question: "What is the purpose of the 'Object.defineProperty()' method?",
    options: [
      { label: "To create new properties", value: "A" },
      { label: "To add or modify a property with fine-grained control", value: "B" },
      { label: "To remove properties", value: "C" },
      { label: "To list object properties", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 48,
    question: "What is the purpose of the 'Object.keys()' method?",
    options: [
      { label: "To encrypt object data", value: "A" },
      { label: "To return an array of a given object's enumerable property names", value: "B" },
      { label: "To create object keys", value: "C" },
      { label: "To sort object properties", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 49,
    question: "What is the purpose of the 'Object.values()' method?",
    options: [
      { label: "To validate objects", value: "A" },
      { label: "To return an array of a given object's enumerable property values", value: "B" },
      { label: "To modify object values", value: "C" },
      { label: "To compare values", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 50,
    question: "What is the purpose of the 'Object.entries()' method?",
    options: [
      { label: "To count object properties", value: "A" },
      { label: "To return an array of a given object's enumerable [key, value] pairs", value: "B" },
      { label: "To create object entries", value: "C" },
      { label: "To sort object entries", value: "D" }
    ],
    correctAnswer: "B"
  }
];

const JavaScriptChallenge = () => {
  const [questions] = useState(() => {
    // Randomly select 10 questions when component mounts
    const shuffled = [...ALL_JAVASCRIPT_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  });
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    if (score > 7) {
      return {
        message: "Congratulations! You've passed the JavaScript challenge!",
        icon: <Trophy className="h-12 w-12 text-yellow-500" />,
        description: "You've demonstrated a strong understanding of JavaScript fundamentals. Keep up the great work!"
      };
    } else {
      return {
        message: "Keep practicing! You're almost there.",
        icon: <AlertCircle className="h-12 w-12 text-blue-500" />,
        description: "Review the concepts you missed and try again. You need to score more than 7 to pass."
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

export default JavaScriptChallenge; 