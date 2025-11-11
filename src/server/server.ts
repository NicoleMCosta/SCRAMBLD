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
    guesses: Date[]; // Timestamps dos acertos
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

    private _categories: GameCategory[];

    private constructor() { 
		this._startTime = new Date();
		this._endTime = new Date();
		this._endTime.setSeconds(this._endTime.getSeconds() + this.MIN_TIME_SECONDS);

		this._categories = [
            { 
                category: "Frutas", 
                words: ["maca", "banana", "laranja", "uva", "abacaxi"], 
                guesses: [] 
            },
            { 
                category: "Animais", 
                words: ["cachorro", "gato", "leao", "tigre", "elefante"], 
                guesses: [] 
            },
        ];
		// TODO: randomize categories
	}

    public getCurrentGame(): Game {
		// TODO: calculate score
		return {
			categoryName: this._categories[this._currentCategoryIndex].category,
			endTime: this._endTime,
			score: 0,
			maxCategoryCount: this.MAX_CATEGORY_COUNT
		}
	}

	private finishCategory() {
		this._currentCategoryIndex++;
		this.setEndTime();
	}

	private setEndTime() {
		this._endTime = new Date();
		this._endTime.setSeconds(this._endTime.getSeconds() + this.MIN_TIME_SECONDS - this._currentCategoryIndex);
	}

	public tryWord(word: string): GuessResult {
		if (!this._endTime) {
			this.setEndTime();
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

		if (this._categories[this._currentCategoryIndex].guesses.length == this.MAX_GUESS_COUNT - 1) {
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