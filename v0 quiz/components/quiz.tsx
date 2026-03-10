"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

const quizData: QuizQuestion[] = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink Text Management Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
  },
]

type QuizState = "start" | "playing" | "finished"

export function Quiz() {
  const [quizState, setQuizState] = useState<QuizState>("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const handleStartQuiz = () => {
    setQuizState("playing")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
  }

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1)
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
    } else {
      setQuizState("finished")
    }
  }

  const handleRestartQuiz = () => {
    setQuizState("start")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
  }

  const getResultMessage = () => {
    const percentage = (score / quizData.length) * 100
    if (percentage === 100) return "Perfect score! You're a genius!"
    if (percentage >= 80) return "Excellent! Great job!"
    if (percentage >= 60) return "Good work! Keep learning!"
    if (percentage >= 40) return "Not bad! Room for improvement."
    return "Keep practicing! You'll do better next time."
  }

  // Start Screen
  if (quizState === "start") {
    return (
      <Card className="w-full max-w-lg rounded-xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">Quick Quiz</CardTitle>
          <CardDescription className="text-base mt-2">
            Test your knowledge with 5 fun questions. Are you ready to challenge yourself?
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-8">
          <Button onClick={handleStartQuiz} size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Quiz Screen
  if (quizState === "playing") {
    const question = quizData[currentQuestion]

    return (
      <Card className="w-full max-w-lg rounded-xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              Score: {score}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            />
          </div>
          <CardTitle className="text-xl mt-4">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className={`w-full justify-start text-left h-auto py-3 px-4 ${
                selectedAnswer === index
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "hover:border-blue-300 hover:bg-blue-50"
              }`}
              onClick={() => handleSelectAnswer(index)}
            >
              <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
          <div className="pt-4">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              size="lg"
            >
              {currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Results Screen
  return (
    <Card className="w-full max-w-lg rounded-xl shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-blue-600">Quiz Complete!</CardTitle>
        <CardDescription className="text-base mt-2">
          {getResultMessage()}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6 pb-8">
        <div className="py-6">
          <div className="text-6xl font-bold text-blue-600">
            {score}/{quizData.length}
          </div>
          <p className="text-muted-foreground mt-2">correct answers</p>
        </div>
        <Button onClick={handleRestartQuiz} size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}
