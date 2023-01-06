import { useState, useEffect } from 'react';

function useDocxDownload(url, data) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let link;

        async function download() {
            setLoading(true);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const blob = await response.blob();

                // Create a link element to trigger the download
                link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'generated-document.docx';
                link.click();
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        download();

        return () => {
            // Revoke the object URL when the component unmounts
            if (link) {
                URL.revokeObjectURL(link.href);
            }
        };
    }, [url]);

    return { loading, error };
}