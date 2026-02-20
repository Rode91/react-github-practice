import { useEffect, useState } from 'react';
import { getUsers, createUser } from '../api/userApi';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUsers = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError('Error cargando usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const parseBackendError = (err) => {
    if (err?.errors?.length) {
      return err.errors.map((e) => e.msg).join(' • ') || 'Error de validación';
    }
    if (err?.message) return err.message;
    return 'Ocurrió un error';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const newUser = await createUser(form);

      // Actualiza lista sin recargar
      setUsers((prev) => [newUser, ...prev]);

      // Limpia form
      setForm({ name: '', email: '' });

      setSuccess('Usuario creado ✅');
      setTimeout(() => setSuccess(null), 2500);
    } catch (err) {
      console.error(err);
      setError(parseBackendError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <header className="pageHeader">
        <h1 className="pageTitle">Usuarios</h1>
        <p className="pageSubtitle">
          Gestión básica de usuarios (React + Node + MySQL)
        </p>
      </header>

      {/* CARD: FORM */}
      <div className="card">
        <form onSubmit={onSubmit} className="form">
          <div className="row">
            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                placeholder="Rode"
                value={form.name}
                onChange={onChange}
                className="input"
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                placeholder="rode@email.com"
                value={form.email}
                onChange={onChange}
                className="input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !form.name || !form.email}
            className="btnPrimary"
          >
            {submitting ? 'Creando...' : 'Crear usuario'}
          </button>
        </form>
      </div>

      {/* FEEDBACK */}
      {success && <div className="alertOk">{success}</div>}
      {error && <div className="alertErr">{error}</div>}

      {/* CARD: LIST + REFRESH BUTTON */}
      <div className="card">
        <div className="listHeader">
          <h3 className="listTitle">Usuarios registrados</h3>

          <button
            type="button"
            onClick={fetchUsers}
            disabled={submitting || loading}
            className="btnSecondary"
          >
            {loading ? 'Actualizando...' : 'Refrescar'}
          </button>
        </div>

        {loading ? (
          <p className="muted">Cargando usuarios...</p>
        ) : users.length === 0 ? (
          <p className="muted">No hay usuarios</p>
        ) : (
          <ul className="list">
            {users.map((user) => (
              <li key={user.id} className="listItem">
                <span className="name">{user.name}</span>
                <span className="email">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Users;


