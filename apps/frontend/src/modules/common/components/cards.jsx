function Cards(props) {
  return (
    <div className="flex row-span-3 justify-end items-center">
      <img className="h-80 border-white border-[10px] rounded-md" src={props.img} alt={props.name} />
    </div>
  );
}

export default Cards;
