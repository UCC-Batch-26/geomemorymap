function Cards(props) {
  return (
    <div className=" row-span-3 justify-self-end items-end">
      <img className="h-80 border-white border-[10px] rounded-md" src={props.img} alt={props.name} />
    </div>
  );
}

export default Cards;
