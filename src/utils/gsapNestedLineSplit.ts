import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);
// Define interfaces for better type safety
interface SplitResult {
  lines: Element[];
  words: Element[];
  chars: Element[];
  revert: () => void;
}

interface HTMLTargetElement extends HTMLElement {
  innerHTML: string;
  children: HTMLCollectionOf<HTMLElement>;
}

export const nestedLineSplit = (
  target: string | HTMLElement | (string | HTMLElement)[],
  vars: SplitText.Vars = {}
): SplitResult => {
  // Merge default options with provided vars
  const splitVars = {
    type: 'lines,words,chars',
    linesClass: 'split-line',
    wordsClass: 'split-word',
    charsClass: 'split-char',
    ...vars,
  };

  const elements = gsap.utils.toArray<HTMLTargetElement>(target);

  // Handle multiple targets
  if (elements.length > 1) {
    const splits = elements.map((t) => nestedLineSplit(t, splitVars));
    const result = splits[0];
    const resultRevert = result.revert;

    result.lines = splits.reduce<Element[]>((acc, cur) => acc.concat(cur.lines), []);
    result.words = splits.reduce<Element[]>((acc, cur) => acc.concat(cur.words), []);
    result.chars = splits.reduce<Element[]>((acc, cur) => acc.concat(cur.chars), []);

    result.revert = () => {
      splits.forEach((split) => (split === result ? resultRevert() : split.revert()));
    };

    return result;
  }

  const [targetElement] = elements;
  const originalContent = targetElement.innerHTML;

  // First split the nested elements
  const nestedSplits: SplitText[] = [];
  const processNestedElements = (element: HTMLElement) => {
    const children = Array.from(element.children) as HTMLElement[];

    children.forEach((child) => {
      if (child.children.length > 0) {
        processNestedElements(child);
      }
      const nestedSplit = new SplitText(child, {
        ...splitVars,
        splitClass: '', // Prevent double-application of classes
      });
      nestedSplits.push(nestedSplit);
    });
  };

  processNestedElements(targetElement);

  // Then split the main element
  const mainSplit = new SplitText(targetElement, splitVars);

  // Create revert function that handles both main and nested splits
  const revert = () => {
    nestedSplits.forEach((split) => split.revert());
    mainSplit.revert();
    targetElement.innerHTML = originalContent;
  };

  return {
    lines: mainSplit.lines,
    words: mainSplit.words,
    chars: mainSplit.chars,
    revert,
  };
};
