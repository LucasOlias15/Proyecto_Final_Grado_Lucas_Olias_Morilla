export const Products = () => {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Nuestros Productos</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="card bg-base-100 shadow-xl border border-base-200">
            <figure className="px-10 pt-10">
              <div className="w-full h-32 bg-jungle_teal/10 rounded-xl"></div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-sm">Producto {item}</h2>
              <div className="card-actions">
                <button className="btn btn-primary btn-sm bg-jungle_teal border-none">Comprar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};