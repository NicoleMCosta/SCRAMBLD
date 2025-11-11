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
    endTime: Date;
    score: number;
	maxCategoryCount: number;
}

interface GameCategory {
    category: string;
    words: string[]; // Palavras que ainda não foram adivinhadas
    guessCounter: number;
}

class Scramble {
    // --- Singleton ---
    private static _instance: Scramble;
    public static getInstance(): Scramble {
        return this._instance || (this._instance = new this());
    }

    // --- Configurações do Jogo ---
    private readonly MAX_GUESS_COUNT = 5;
    private readonly MAX_CATEGORY_COUNT = 5;
    private readonly MIN_TIME_SECONDS = 30;

    // --- Estado do Jogo ---
    private _currentCategoryIndex = 0;
    private _startTime: Date;
    private _endTime: Date;
	private _score = 0;

    private _categories: GameCategory[];

    private constructor() {
		const vocabulary = require('./src/assets/vocabulary.json');

        this._categories = Object.keys(vocabulary).map(categoryName => ({
            category: categoryName,
            words: vocabulary[categoryName],
            guessCounter: 0
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
			endTime: this._endTime,
			score: this._score,
			maxCategoryCount: this.MAX_CATEGORY_COUNT
		}
	}

	private finishCategory() {
		this._currentCategoryIndex++;
		this.setTimes();
	}

	private setTimes() {
		this._startTime = new Date();
		this._endTime = new Date();
		this._endTime.setSeconds(this._endTime.getSeconds() + this.MIN_TIME_SECONDS - this._currentCategoryIndex);
	}

	private score() {
		const now = new Date();
		const seconds = (now.getTime() - this._startTime.getTime()) / 1000;
		this._score += (this.MIN_TIME_SECONDS * 2) - seconds;
		// Reseta o tempo do ultimo acerto
		this._startTime = new Date();
	}

	public tryWord(word: string): GuessResult {
		if (!this._endTime) {
			this.setTimes();
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

		if (this._categories[this._currentCategoryIndex].guessCounter == this.MAX_GUESS_COUNT - 1) {
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