
function Anchor({ id }: { id: string }) {
  return <div className='relative'>
    <span id={id} data-anchor={true} className="absolute top-[-74px] sr-only">{id}</span>
  </div>
}

export default Anchor;