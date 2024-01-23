const Notification = ({ text, type }) => {
  if (!text) return;
  return <div className={`notification ${type}`}>{text}</div>;
};

export default Notification;
