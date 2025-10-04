function MemCards(props) {
  return (
    <div className="">
      <img
        className="p-5 h-80 w-100 border-white border-[10px] rounded-md"
        src={props.img}
        onError={this.addDefaultSrc}
      />
      <h2 className="font-display font-semibold">{props.title}</h2>
      <p className="font-display">{props.description}</p>
    </div>
  );
}

export default MemCards;

// const MemoryCards = ({ img, title, description }) => {
//     return (
//         <div>
//             <img src={img} alt={title} />
//             <h2>{title}</h2>
//             <p>{description}</p>
//         </div>
//     )
// }

// export default CardsList;
