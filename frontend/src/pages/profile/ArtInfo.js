import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ArtInfo.css';

function ArtInfo({ userId }) {
    const [artData, setArtData] = useState({
        allContent: [],
        registeredContent: [],
        winningContent: [],
    });

    useEffect(() => {
        const fetchArtInfo = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/profile/art-info`, { userId });
                if (response.data && response.data.success) {
                    setArtData({
                        allContent: response.data.allContent,
                        registeredContent: response.data.registeredContent,
                        winningContent: response.data.winningContent,
                    });
                    toast.success('Art info fetched successfully');
                } else {
                    toast.error('Failed to fetch art info');
                }
            } catch (error) {
                console.error('Error fetching art info', error);
                toast.error('Error fetching art info');
            }
        };
        fetchArtInfo();
    }, [userId]);

    const renderContentSection = (title, contentArray) => (
        <>
            {contentArray.length > 0 && (
                <div className="art-section">
                    <h4 className="art-section-title">{title}</h4>
                    <div className="art-items-grid">
                        {contentArray.map((item) => (
                            <div key={item.id} className="art-item-card">
                                <img
                                    src={item.url_for_content}
                                    alt={item.caption}
                                    className="art-image"
                                />
                                <p className="art-title">{item.caption}</p>
                                <p className="art-description">{item.description}</p>
                                {item.upload_date && (
                                    <p className="art-upload-date">
                                        Uploaded on: {new Date(item.upload_date).toLocaleDateString()}
                                    </p>
                                )}
                                {item.contest_caption && (
                                    <p className="art-contest">
                                        Contest: {item.contest_caption}
                                    </p>
                                )}
                                {item.winning_category && (
                                    <p className="art-winning-category">
                                        Winning Category: {item.winning_category}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );

    if (
        !artData.allContent.length &&
        !artData.registeredContent.length &&
        !artData.winningContent.length
    )
        return <p className="no-art-message">No art info available</p>;

    return (
        <div className="art-info-section">
            <h3 className="section-title">Art Info</h3>

            {renderContentSection('All Art Content', artData.allContent)}
            {renderContentSection('Registered Contest Content', artData.registeredContent)}
            {renderContentSection('Winning Contest Content', artData.winningContent)}
        </div>
    );
}

export default ArtInfo;
