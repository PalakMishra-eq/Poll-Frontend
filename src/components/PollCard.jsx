const PollCard = ({ title, description, expirationDate }) => {
    return (
      <div className="border rounded p-4 shadow">
        <h3 className="text-xl font-bold">{title}</h3>
        <p>{description}</p>
        <p className="text-sm text-gray-500">Expires on: {expirationDate}</p>
      </div>
    );
  };
  
  export default PollCard;
  