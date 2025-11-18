import * as vocabulary from "../assets/vocabulary.json";

enum GuessType {
    RIGHT = "RIGHT",
    WRONG = "WRONG",
}

interface GuessResult {
    type: GuessType;
    isFinished: boolean;
}

interface Game {
    categoryName: string;
    score: number;
	/** Quantidade maxima de categorias por jogo */
	maxCategoryCount: number;
	/** Quantidade maxima acertos por categoria */
	maxRightGuessesPerCategory: number;
	/** Quantidade de acertos na categoria atual */
	rightGuessesCount: number;
}

interface GameCategory {
    category: string;
    words: string[]; // Palavras que ainda não foram adivinhadas
    rightGuessCounter: number;
}

export class Scramble {
    // --- Singleton ---
    private static _instance: Scramble;
    public static getInstance(): Scramble {
        return this._instance || (this._instance = new this());
    }

    // --- Configurações do Jogo ---

	/** Quantidade de acertos por categoria */
    private readonly MAX_GUESS_COUNT = 5;
	/** Quantidade de categorias por jogo */
    private readonly MAX_CATEGORY_COUNT = 5;
	/** Tempo em segundos usado para calcular score */
    private readonly MIN_TIME_SECONDS = 30;

    // --- Estado do Jogo ---
    private _currentCategoryIndex = 0;
    private _startTime: Date;
	private _score = 0;

    private _categories: GameCategory[];

    private constructor() {

        this._categories = Object.keys(vocabulary).map(categoryName => ({
            category: categoryName,
            words: vocabulary[categoryName],
            rightGuessCounter: 0
        }));

		this.shuffleArray(this._categories);
	}

	private shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }

    public getCurrentGame(): Game {
		return {
			categoryName: this._categories[this._currentCategoryIndex].category,
			score: this._score,
			maxCategoryCount: this.MAX_CATEGORY_COUNT,
			maxRightGuessesPerCategory: this.MAX_GUESS_COUNT,
			rightGuessesCount: this._categories[this._currentCategoryIndex].rightGuessCounter
		}
	}

	private finishCategory() {
		this._currentCategoryIndex++;
		this.setTimes();
	}

	private setTimes() {
		this._startTime = new Date();
	}

	private score() {
		const now = new Date();
		const seconds = (now.getTime() - this._startTime.getTime()) / 1000;
		this._score += (this.MIN_TIME_SECONDS * 2) - seconds;
		this._categories[this._currentCategoryIndex].rightGuessCounter += 1;
		// Reseta o tempo do ultimo acerto
		this._startTime = new Date();
	}

	public tryWord(word: string): GuessResult {
		if (!this._startTime) {
			this._startTime = new Date();
		}

		if (this._categories[this._currentCategoryIndex].words.includes(word)) {
			this._categories[this._currentCategoryIndex].words = this._categories[this._currentCategoryIndex].words.filter((x) => x != word)
		} else {
			return {
				type: GuessType.WRONG,
				isFinished: false
			};
		}

		this.score();

		if (this._categories[this._currentCategoryIndex].rightGuessCounter == this.MAX_GUESS_COUNT ) {
			this.finishCategory();
			return {
				type: GuessType.RIGHT,
				isFinished: true
			};
		} else {
			return {
				type: GuessType.RIGHT,
				isFinished: false
			};
		}
	}
}