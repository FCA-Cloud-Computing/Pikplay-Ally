const Dogs = () => {
  const dogsArray = ["images/dog1.jpg", "images/dog2.jpg", "images/dog3.jpg"];
  return (
    <div>
      <h1>Dogs:</h1>
      {dogsArray.map((value, key) => (
        <img
          key={key}
          src={`${process.env.NEXT_PUBLIC_CDN_URL}/${value}`}
          width="300"
        />
      ))}
    </div>
  );
};

export default Dogs;
