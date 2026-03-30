import { useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../routes';
import './Resources.css';

type GettingStartedMode = 'provision' | 'connect';

export default function Resources() {
  const [gettingStartedMode, setGettingStartedMode] = useState<GettingStartedMode>('provision');

  return (
    <div className="resources">
      <section id="getting_started">
        <h2>getting_started</h2>
        <p>Download the Mobile Forge app, then choose a path below to connect your first server.</p>

        <div className="toggle-group">
          <button
            className={`toggle-btn${gettingStartedMode === 'provision' ? ' active' : ''}`}
            onClick={() => setGettingStartedMode('provision')}>
            <i className="ph ph-cloud-arrow-up"></i>
            provision a server
          </button>
          <button
            className={`toggle-btn${gettingStartedMode === 'connect' ? ' active' : ''}`}
            onClick={() => setGettingStartedMode('connect')}>
            <i className="ph ph-plugs-connected"></i>
            connect existing server
          </button>
        </div>

        {gettingStartedMode === 'provision' && (
          <div className="steps">
            <div className="steps-note">
              <i className="ph ph-info"></i>
              <span>Requires an elevated plan — The Apprentice or The Blacksmith. Add your <Link to={`${ROUTES.SETTINGS}#keys`}>API keys</Link> before starting.</span>
            </div>
            <ol className="step-list">
              <li>
                <div className="step-body">
                  <span className="step-label">Add provider keys</span>
                  <span className="step-detail">In the dashboard, go to <strong>settings › keys</strong> and add a DigitalOcean key. Optionally add a GitHub key to clone a repository during setup.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Open the app and tap Provision Server</span>
                  <span className="step-detail">Select the <strong>provision server</strong> button on the home screen of the Mobile Forge app.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Select your keys</span>
                  <span className="step-detail">Choose the DigitalOcean key you added, and optionally a GitHub key.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Configure the server</span>
                  <span className="step-detail">Pick a server size and access method. Optionally select a GitHub repository to clone into your home directory.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Provision</span>
                  <span className="step-detail">Tap <strong>provision</strong> and wait for the server to spin up.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Connect</span>
                  <span className="step-detail">Your new server will appear on the home screen. Tap <strong>connect</strong> to open a shell and access the sftp file explorer.</span>
                </div>
              </li>
            </ol>
          </div>
        )}

        {gettingStartedMode === 'connect' && (
          <div className="steps">
            <div className="steps-note">
              <i className="ph ph-info"></i>
              <span>You will need a PC or web console to complete the initial server setup before connecting from the app.</span>
            </div>
            <ol className="step-list">
              <li>
                <div className="step-body">
                  <span className="step-label">Create a user with SSH password auth</span>
                  <span className="step-detail">On your server (from a PC or web console), create a user and temporarily enable SSH password authentication for that user only.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Tap Connect to a Server in the app</span>
                  <span className="step-detail">Open the Mobile Forge app and select <strong>connect to a server</strong> on the home screen.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Enter host details</span>
                  <span className="step-detail">Input the server's IP address, port (default: 22), set auth type to <strong>basic</strong>, and enter your username and password.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Save the server</span>
                  <span className="step-detail">Save the connection. It will appear on your home screen.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Connect and generate an SSH key</span>
                  <span className="step-detail">Tap <strong>connect</strong> to verify access. Then exit and from the home screen add a new server connection, set auth type to <strong>key</strong>, and tap <strong>generate key</strong>. Copy the public key.</span>
                </div>
              </li>
              <li>
                <div className="step-body">
                  <span className="step-label">Harden SSH access</span>
                  <span className="step-detail">From your basic-auth connection, add the copied public key to the user's <code>~/.ssh/authorized_keys</code> file. Then update your SSH service config to restrict password auth for that user and restart the service. Configure UFW to allow only SSH.</span>
                </div>
              </li>
            </ol>
          </div>
        )}
      </section>

      <section id="how_to_guides">
        <h2>how_to_guides</h2>
        <p>Step-by-step guides to help you get the most out of mobile_forge.</p>
        <div className="wip">
          <i className="ph ph-hammer wip-icon"></i>
          <span className="wip-label">under construction</span>
          <span className="wip-detail">Guides are on the way. Check back soon.</span>
        </div>
      </section>
    </div>
  );
}
