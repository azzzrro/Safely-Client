
const ThemeButton = ({ text }: { text: string }) => {

  const handleEmailClick = () => {
    window.location.href = `mailto:helloazzzrro@gmail.com`;
  };

  return (
    <button
      onClick={handleEmailClick}
      className='bg-blue-800 text-golden font-bold rounded-xl hover:scale-105 duration-300 px-3.5 py-2.5'>
      {text.toUpperCase()}
    </button>
  );
};

export default ThemeButton;
