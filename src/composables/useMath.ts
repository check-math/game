import { ref } from 'vue'
import { Difficulties } from '@/constants/game'
interface IQuiz {
  num1: number, num2: number, correct: boolean
}
export const useMath = () => {
  const userRequest = ref<IQuiz[]>([])
  const currentQuiz = ref<IQuiz>({ num1: 0, num2: 0, correct: false })
  const currentSymbol = ref<string | null>(null)
  const currentDifficulty = ref<number>(1)
  const isQuizActive = ref(false)
  const timeLeft = ref(0)
  const duration = ref(0)

  const getRandomNumber = (min: number = 1, max: number = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateQuiz = (difficulty: number) => {
    const min = difficulty === Difficulties.EASY
                ? 1
                : difficulty === Difficulties.NORMAL
                  ? 6801
                  : 969001
    const max = difficulty === Difficulties.EASY
                ? 100
                : difficulty === Difficulties.NORMAL
                  ? 6899
                  : 969999
    const num1 = getRandomNumber(min, max)
    const num2 = getRandomNumber(min, max)
    currentSymbol.value = null

    return {
      num1,
      num2,
      correct: false
    };
  }
  const checkAnswer = (quiz: IQuiz, symbol: string) => {
    const { num1, num2 } = quiz
    currentQuiz.value.correct =
      (symbol === '>' && num1 > num2) ||
      (symbol === '<' && num1 < num2) ||
      (symbol === '=' && num1 === num2) as boolean
    userRequest.value.push(currentQuiz.value)
    currentQuiz.value = generateQuiz(currentDifficulty.value);
  }
  let timer: number = 0;
  const startTimer = () => {
    timer = setInterval(() => {
      timeLeft.value--;
      if (timeLeft.value <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  const endQuiz = () => {
    isQuizActive.value = false;
    clearInterval(timer);
  }
  const startQuiz = () => {
    isQuizActive.value = true;
    timeLeft.value = duration.value * 60;
    userRequest.value = [];
    currentQuiz.value = generateQuiz(currentDifficulty.value);
    startTimer();
  }
  const nextQuestion = () => {
    currentQuiz.value.correct = false
    userRequest.value.push(currentQuiz.value)
    currentQuiz.value = generateQuiz(currentDifficulty.value);
  }
  return {
    userRequest,
    currentQuiz,
    isQuizActive,
    timeLeft,
    duration,
    startQuiz,
    endQuiz,
    startTimer,
    checkAnswer,
    currentSymbol,
    currentDifficulty,
    nextQuestion,
  }
}
