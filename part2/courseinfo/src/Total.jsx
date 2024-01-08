const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => part.exercises + total, 0);

  return (
    <p>
      <strong>
        Total of {total} exercise{total > 0 ? 's' : ''}
      </strong>
    </p>
  );
};

export default Total;
