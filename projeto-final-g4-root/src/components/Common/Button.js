export default function Button({onClick, label}) {
    return (

      <div className="w-full max-w-md mt-4">
        <button
          type="submit"
          className="w-full mt-6 h-14 
          rounded-[24px]
          bg-gradient-to-r from-purple-600 to-indigo-600
           text-white text-lg font-semibold"
          onClick={onClick}
        >
{label}        
</button>
</div>
    )
}