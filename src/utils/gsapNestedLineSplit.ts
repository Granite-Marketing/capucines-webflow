import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

// Define interfaces for better type safety
interface SplitResult {
  lines: HTMLElement[];
  words: HTMLElement[];
  chars: HTMLElement[];
  revert: () => void;
}

export const nestedLineSplit = (
  target: string | HTMLElement | (string | HTMLElement)[],
  vars: SplitText.Vars = {}
): SplitResult => {
  const splitVars = {
    type: 'lines,words,chars',
    linesClass: 'split-line',
    wordsClass: 'split-word',
    charsClass: 'split-char',
    ...vars,
  };

  const elements = gsap.utils.toArray(target) as HTMLElement[];

  if (elements.length > 1) {
    const splits = elements.map((t) => nestedLineSplit(t, splitVars));
    return {
      lines: splits.flatMap((split) => split.lines),
      words: splits.flatMap((split) => split.words),
      chars: splits.flatMap((split) => split.chars),
      revert: () => splits.forEach((split) => split.revert()),
    };
  }

  const [targetElement] = elements;
  if (!targetElement) {
    return { lines: [], words: [], chars: [], revert: () => {} };
  }

  const originalContent = targetElement.innerHTML;
  const nestedSplits: SplitText[] = [];

  const processNestedElements = (element: HTMLElement) => {
    Array.from(element.children).forEach((child: Element) => {
      const htmlChild = child as HTMLElement;
      if (htmlChild.children.length > 0) {
        processNestedElements(htmlChild);
      }
      const nestedSplit = new SplitText(htmlChild, {
        ...splitVars,
        type: 'words,chars', // Avoid splitting nested elements into lines
      });
      nestedSplits.push(nestedSplit);
    });
  };

  processNestedElements(targetElement);

  const mainSplit = new SplitText(targetElement, splitVars);

  const revert = () => {
    nestedSplits.forEach((split) => split.revert());
    mainSplit.revert();
    targetElement.innerHTML = originalContent;
  };

  return {
    lines: Array.from(mainSplit.lines || []) as HTMLElement[],
    words: Array.from(mainSplit.words || []) as HTMLElement[],
    chars: Array.from(mainSplit.chars || []) as HTMLElement[],
    revert,
  };
};
