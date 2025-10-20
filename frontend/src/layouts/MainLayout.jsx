import React from "react";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
    <aside className="w-64 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Gestor</h2>
        <nav>
            <ul>
                <li className="mb-2"><a href="#" className="text-gray-700 hover:text-green-600">Dashboard</a></li>
                <li className="mb-2"><a href="#" className="text-gray-700 hover:text-green-600">Produtos</a></li>
                <li className="mb-2"><a href="#" className="text-gray-700 hover:text-green-600">Despesas</a></li>
                <li className="mb-2"><a href="#" className="text-gray-700 hover:text-green-600">Vendas</a></li>
            </ul>
        </nav>
    </aside>
}

function MainLayout() {
    return(
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;