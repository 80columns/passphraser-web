import { getWordList } from "./WordList";

enum PassphrasePart {
    Word,
    Number,
    SpecialCharacter
}

const numberLowerBoundInclusive = 1_000;
const numberUpperBoundExclusive = 10_000;
// there are 32 special characters on a US-English keyboard
const specialCharacters: string[] = [
    '`', '~', '!', '@',
    '#', '$', '%', '^',
    '&', '*', '(', ')',
    '-', '_', '+', '=',
    '[', ']', '{', '}',
    ':', ';', '"', '\'',
    ',', '<', '.', '>',
    '?', '/', '|', '\\'
];

const getFactorial = (value: number): number => {
    let factorial = value;

    for (let i = value - 1; i > 1; i--) {
        factorial *= i;
    }

    return factorial;
};

const generateRandomBool = (): boolean => {
    const numberArray = new Uint8Array(1);
    crypto.getRandomValues(numberArray);

    return numberArray[0] % 2 === 0;
};

const generateRandomNumber = (): string => {
    const numberArray = new Uint16Array(1);
    crypto.getRandomValues(numberArray);

    // the returned value should be betwene 1,000 and 9,999 (inclusive),
    // while the random number will be between 0 and 2^16 - 1
    // 0 -> 1,000
    // 8,999 -> 9,999
    const outputNumber: number = (numberArray[0] % (numberUpperBoundExclusive - numberLowerBoundInclusive)) + numberLowerBoundInclusive;

    return outputNumber.toString();
};

const generateRandomSpecialCharacter = (): string => {
    const numberArray = new Uint8Array(1);
    crypto.getRandomValues(numberArray);

    const characterIndex: number = numberArray[0] % specialCharacters.length;

    return specialCharacters[characterIndex];
};

const generateRandomWord = (isLowercase: boolean, wordlist: string[]): string => {
    const numberArray = new Uint32Array(1);
    crypto.getRandomValues(numberArray);

    const wordIndex: number = numberArray[0] % wordlist.length;

    return isLowercase ? wordlist[wordIndex] : wordlist[wordIndex].toUpperCase();
};

// for an odd wordCount (wordCount = 2N + 1), there will be:
//      N numbers and N + 1 special characters
//      N uppercase words and N + 1 lowercase words

// for an even wordCount (wordCount = 2N), there will be:
//      N numbers and N special characters
//      N uppercase words and N lowercase words
const getSpecialCharacterAndLowercaseWordCount = (wordCount: number): number => {
    return Math.ceil(wordCount / 2);
};

const getNumberAndUppercaseWordCount = (wordCount: number): number => {
    return Math.floor(wordCount / 2);
};

export const generatePassphrase = (wordCount: number): { part: string; partType: PassphrasePart }[] => {
    const wordlist: string[] = getWordList();
    const passphraseParts: { part: string; partType: PassphrasePart }[] = [];
    let lowercaseWordCount: number, uppercaseWordCount: number, numberCount: number, specialCharacterCount: number;

    const appendToken = (appendValue: string, partIdentifier: PassphrasePart) => {
        passphraseParts.push({ part: appendValue, partType: partIdentifier });
    };

    const appendSpecialCharacter = () => {
        appendToken(
            generateRandomSpecialCharacter(),
            PassphrasePart.SpecialCharacter,
        );

        specialCharacterCount--;
    };

    const appendNumber = () => {
        appendToken(generateRandomNumber(), PassphrasePart.Number);

        numberCount--;
    };

    const appendLowercaseWord = () => {
        appendToken(generateRandomWord(true, wordlist), PassphrasePart.Word);

        lowercaseWordCount--;
    };

    const appendUppercaseWord = () => {
        appendToken(generateRandomWord(false, wordlist), PassphrasePart.Word);

        uppercaseWordCount--;
    };

    specialCharacterCount = lowercaseWordCount = getSpecialCharacterAndLowercaseWordCount(wordCount);
    numberCount = uppercaseWordCount = getNumberAndUppercaseWordCount(wordCount);

    // run the loop while there are words to append
    while (lowercaseWordCount > 0 || uppercaseWordCount > 0) {
        if (numberCount > 0 && specialCharacterCount > 0) {
            if (generateRandomBool()) {
                appendSpecialCharacter();
            } else {
                appendNumber();
            }
        } else if (specialCharacterCount > 0) {
            appendSpecialCharacter();
        } else {
            appendNumber();
        }

        if (uppercaseWordCount > 0 && lowercaseWordCount > 0) {
            if (generateRandomBool()) {
                appendLowercaseWord();
            } else {
                appendUppercaseWord();
            }
        } else if (lowercaseWordCount > 0) {
            appendLowercaseWord();
        } else {
            appendUppercaseWord();
        }
    }

    return passphraseParts;
};

// JavaScript has a floating-point number type so Math.round() is used to get
// the nearest integer from a floating-point value
const getRoundedBitEntropy = (value: number): number => {
    const bitEntropy = Math.log2(value);

    return Math.round(bitEntropy);
};

export const getPassphraseStrength = (wordCount: number, wordlist: string[]): { passphrasePermutations: number; passphraseBitEntropy: number } => {
    const specialCharacterAndLowercaseWordCount = getSpecialCharacterAndLowercaseWordCount(wordCount);
    const numberAndUppercaseWordCount = getNumberAndUppercaseWordCount(wordCount);

    // see https://en.wikipedia.org/wiki/Permutation, "Permutations of multisets"
    // or https://byjus.com/maths/permutation/, "Permutation of multi-sets"
    //
    // below we take the multiset permutation of the words, which is the same as the multiset permutation of the special characters & numbers,
    // and then multiply them together to get the total number of passphrase formats which can be generated by this program given a specific N number of words
    // this is different than taking the multiset of all items together, because there is a specific alternating order and all generated passphrases start
    // with either a special character or a number
    const wordCountFactorial = getFactorial(wordCount);
    const lowercaseWordCountFactorial = getFactorial(specialCharacterAndLowercaseWordCount);
    const uppercaseWordCountFactorial = getFactorial(numberAndUppercaseWordCount);
    const lowercaseUppercaseWordPermutations = Math.floor(wordCountFactorial / (lowercaseWordCountFactorial * uppercaseWordCountFactorial));
    const passphraseFormatPermutations = Math.pow(lowercaseUppercaseWordPermutations, 2);
    const passphrasePermutations =
        Math.pow(wordlist.length, wordCount)
        * Math.pow(specialCharacters.length, specialCharacterAndLowercaseWordCount)
        * Math.pow(numberUpperBoundExclusive - numberLowerBoundInclusive, numberAndUppercaseWordCount)
        * passphraseFormatPermutations;

    const passphraseBitEntropy = getRoundedBitEntropy(passphrasePermutations);

    return {
        passphrasePermutations,
        passphraseBitEntropy
    }
};

export const getComparablePasswordStrength = (passphrasePermutations: number): { passwordPermutations: number; passwordLength: number; passwordBitEntropy: number } => {
    const validAsciiCharacterCount = 94;
    let passwordLength = 12;
    let passwordPermutations = Math.pow(validAsciiCharacterCount, passwordLength);
    let previousPasswordPermutations = passwordPermutations;

    while (passwordPermutations < passphrasePermutations) {
        previousPasswordPermutations = passwordPermutations;
        passwordLength++;
        passwordPermutations = Math.pow(validAsciiCharacterCount, passwordLength);
    }

    // previousPasswordPermutations is used here because at this point in the code passwordPermutations will be greater than passphrasePermutations
    // we need to return the maximum password permutations which is less than the passphrase permutations
    const passwordBitEntropy = getRoundedBitEntropy(previousPasswordPermutations);

    return {
        passwordPermutations: previousPasswordPermutations,
        passwordLength: passwordLength - 1,
        passwordBitEntropy
    };
};
