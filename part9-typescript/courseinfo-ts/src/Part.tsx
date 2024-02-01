import { CoursePart } from './App.tsx';
import { assertNever } from './utils.ts';

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.kind) {
    case 'basic': {
      const { name, exerciseCount, description } = coursePart;
      return (
        <>
          <h2>
            {name} {exerciseCount}
          </h2>

          <p>
            <em>{description}</em>
          </p>
        </>
      );
    }
    case 'group': {
      const { name, exerciseCount, groupProjectCount } = coursePart;
      return (
        <>
          <h2>
            {name} {exerciseCount}
          </h2>
          <p>Project exercises {groupProjectCount}</p>
        </>
      );
    }
    case 'background': {
      const { name, exerciseCount, description, backgroundMaterial } =
        coursePart;
      return (
        <>
          <h2>
            {name} {exerciseCount}
          </h2>
          <p>
            <em>{description}</em>
          </p>
          <p>Submit to {backgroundMaterial}</p>
        </>
      );
    }
    case 'special': {
      const { name, exerciseCount, description, requirements } = coursePart;
      return (
        <>
          <h2>
            {name} {exerciseCount}
          </h2>
          <p>
            <em>{description}</em>
          </p>
          <p>
            Required skills:{' '}
            {requirements.map((requirement) => requirement).join(', ')}
          </p>
        </>
      );
    }
    default:
      return assertNever(coursePart);
  }
};

export default Part;
