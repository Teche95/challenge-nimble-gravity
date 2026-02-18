import { usePositions } from "../hooks/usePositions";

const ListPositions = () => {
  const { positions, globalError, errors, loading, handleSubmit, setRepoUrls } =
    usePositions();

  return (
    <>
      {globalError && <p className="text-red-600">{globalError}</p>}
      <div className=" grid grid-cols-3 gap-10 justify-center">
        {positions &&
          positions.map(({ id, title }) => (
            <div className="grid" key={id}>
              <h1 className="font-semibold text-4xl">{title}</h1>
              <div className="flex flex-col gap-7 mt-5">
                <input
                  className="border-2 rounded h-8"
                  type="text"
                  onChange={(e) =>
                    setRepoUrls((prev) => ({
                      ...prev,
                      [id]: e.target.value,
                    }))
                  }
                />
                <button
                  type="submit"
                  onClick={() => handleSubmit(id)}
                  disabled={loading[id]}
                >
                  {loading[id] ? "Enviando..." : "Enviar"}
                </button>
              </div>
              {errors[id] && <p className="text-error">{errors[id]}</p>}
            </div>
          ))}
      </div>
    </>
  );
};

export default ListPositions;
