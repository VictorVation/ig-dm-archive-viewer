import React from 'react';
import Dropzone from 'react-dropzone';

import './UploadForm.css';

class UploadForm extends React.Component {
  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length !== 0) {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        const threads = JSON.parse(reader.result);
        const freqs = {};
        for (const thread of threads) {
          for (const participant of thread.participants) {
            freqs[participant] = (freqs[participant] || 0) + 1;
          }
        }

        this.props.setUsername(
          Object.keys(freqs).reduce((a, b) => (freqs[a] > freqs[b] ? a : b))
        );
        this.props.setMessages(threads);
      });
      reader.readAsText(acceptedFiles[0]);
    }
  }

  render() {
    return (
      <div className="UploadForm">
        <div className="UploadForm-instructions">
          <p>
            IG DM Archive Viewer is a tool that allows you to view your
            Instagram Direct conversation archive, allowing you to search and
            see the oldest messages in a DM thread.
          </p>
          <p>
            To get started, you'll need to download your Instagram data export
            by following the official instructions at{' '}
            <a href="https://www.instagram.com/download/request/">
              instagram.com/download/request
            </a>.
          </p>
          <p>
            Once you've downloaded your archive, extract the <code>.zip</code>{' '}
            folder, then drag and drop the <code>messages.json</code> file into
            the area below.
          </p>
        </div>

        <Dropzone
          accept="application/json"
          onDrop={this.onDrop.bind(this)}
          className="UploadForm-dropzone"
          activeClassName="UploadForm-dropzone-active"
          rejectClassName="UploadForm-dropzone-rejected"
        >
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            return (
              <React.Fragment>
                {(isDragReject || rejectedFiles.length > 0) && (
                  <p>
                    <strong className="UploadForm-error">
                      File incompatible, please upload a <code>.json</code>{' '}
                      file.
                    </strong>
                  </p>
                )}
                <p>
                  Drag and drop <code>messages.json</code> from your IG export
                  here, or click to select a file. Only <code>.json</code> files
                  are accepted.
                </p>
                <p>
                  All data processing is done right on your computer. Nobody
                  except for you will be able to see your messages.
                </p>
              </React.Fragment>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}

export default UploadForm;
