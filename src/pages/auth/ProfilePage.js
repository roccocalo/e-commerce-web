import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { userInfo } = useAuth();
  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
  });
  
  const oggi = new Date().toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    if (userInfo) {
      setFormData(prev => ({
        ...prev,
        name: userInfo.name,
        email: userInfo.email
      }));
    }
  }, [userInfo]);

  if (!userInfo) {
    return <div>Accesso non autorizzato</div>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-4">
                <h2>Il tuo profilo</h2>
                <div className="alert alert-info mt-3">
                  <h4>Ciao {userInfo.name}!</h4>
                  <p>Oggi è {oggi}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Nome:</label>
                <p className="form-control">{formData.name}</p>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Email:</label>
                <p className="form-control">{formData.email}</p>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-muted">
                  Benvenuto nel tuo spazio personale. Qui puoi visualizzare i tuoi dati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;