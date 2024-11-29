import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProgressBarProps {
    duration: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration = 3000 }) => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + (100 / (duration / 100)); 
            });
        }, 100); 
        const timeout = setTimeout(() => {
            navigate('/Vecations');
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [duration, navigate]);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow" style={{ width: '25rem' }}>
                <div className="card-body">
                    <h3 className="text-center mb-4">Loading...</h3>
                    <div className="progress mb-3">
                        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}>
                            {progress.toFixed(0)}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
