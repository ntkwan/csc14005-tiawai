import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Card, FlashcardEntity } from './entities/flashcard.entity';
import { ExtractFlashcardDto } from './dtos/extract-flashcard.dto';
import { ConfigService } from '@nestjs/config';
import { TEMPLATES } from './template.constants';
import { UserLoginDto } from 'src/users/dtos/user-login.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FlashcardService {
    constructor(
        @InjectModel(FlashcardEntity)
        private readonly flashcardModel: typeof FlashcardEntity,
        private configService: ConfigService,
    ) {}

    async findAllTopics(user: User) {
        try {
            const userId: string = user.id;
            return this.flashcardModel.findAll({
                where: {
                    userId,
                },
                attributes: ['topic'],
                order: [['uploadAt', 'DESC']],
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to get flashcards',
                error.message,
            );
        }
    }

    async findFlashcardsByTopic(topic: string, user: User) {
        try {
            const userId: string = user.id;
            return this.flashcardModel.findOne({
                where: {
                    userId,
                    topic,
                },
                attributes: ['flashcards'],
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to get flashcards',
                error.message,
            );
        }
    }

    async extract(
        extractFlashcardDto: ExtractFlashcardDto,
        user: UserLoginDto,
    ) {
        try {
            const { paragraph } = extractFlashcardDto;
            const response = await axios.post(
                `${this.configService.get('OPENAI_ENDPOINT')}`,
                {
                    model: this.configService.get('OPENAI_MODEL'),
                    messages: [
                        {
                            role: 'system',
                            content: TEMPLATES.CONTEXT_AWARE,
                        },
                        {
                            role: 'user',
                            content: `${TEMPLATES.CONSTANT_REQUEST} + ${paragraph}`,
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.configService.get('OPENAI_API_KEY')}`,
                    },
                },
            );

            const msg: string = response.data.choices[0]?.message?.content;

            if (!msg) {
                throw new InternalServerErrorException(
                    'Failed to extract vocabulary',
                );
            }
            const topic = msg.split('\n')[0];
            const vocabularies: {
                word: string;
                meaning: string;
                wordType: string;
            }[] = msg.split('\n').map((vocabulary: string) => {
                if (!vocabulary || vocabulary === topic) {
                    return {
                        word: '',
                        meaning: '',
                        wordType: '',
                    };
                }
                const [word, meaning, wordType] = vocabulary.split(', ');
                return {
                    word,
                    meaning,
                    wordType,
                };
            });
            const filteredVocabularies = vocabularies.filter(
                (vocabulary) =>
                    vocabulary.word.length > 0 &&
                    vocabulary.meaning.length > 0 &&
                    vocabulary.wordType.length > 0,
            );

            const flashCards: Card[] = filteredVocabularies.map((flashcard) => {
                return {
                    word: flashcard.word,
                    meaning: flashcard.meaning,
                    wordType: flashcard.wordType,
                };
            });

            const flashcardBatch = await this.flashcardModel.create({
                topic,
                flashcards: flashCards,
                totalFlashcards: flashCards.length,
                userId: user.id,
            });

            if (!flashcardBatch) {
                throw new InternalServerErrorException(
                    'Failed to save flashcard',
                );
            }
            return flashcardBatch;
        } catch (error) {
            throw new InternalServerErrorException(
                'Flashcard not extracted',
                error.response?.data?.error || error.message,
            );
        }
    }
}
