export type Duration = 30 | 45 | 60 | 120;

export const DURATION_OPTIONS: Duration[] = [30, 45, 60, 120];

export type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp';

export type Screen = 'start' | 'countdown' | 'typing' | 'results';

export type CharStatus = 'untyped' | 'correct' | 'incorrect';

export interface TestResult {
  wpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  totalChars: number;
  timeElapsedSeconds: number;
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
};

export const LANGUAGE_EXTENSIONS: Record<Language, string> = {
  javascript: 'js',
  typescript: 'ts',
  python: 'py',
  java: 'java',
  cpp: 'cpp',
};
