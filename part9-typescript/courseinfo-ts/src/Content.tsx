import { CoursePart } from './App.tsx';
import Part from './Part.tsx';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <section>
      {courseParts.map((coursePart: CoursePart, i: number) => {
        return (
          <article key={i}>
            <Part coursePart={coursePart} />
          </article>
        );
      })}
    </section>
  );
};

export default Content;
