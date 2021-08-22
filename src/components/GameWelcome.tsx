import * as React from "react";
import { useState } from "react";
import Wave from "react-wavify";
import { Button, Input } from "semantic-ui-react";

const getStateFromPostcode = (postcode) => {
    if (postcode >= 3000) {
        return "VIC";
    } else if (postcode >= 2000) {
        return "NSW";
    } else {
        return "NSW";
    }
}

export const GameWelcome = () => {

    const [panel, setPanel] = useState(1);
    const [postcode, setPostcode] = useState<number>(3000);
    const [age, setAge] = useState<number>(18);

    const positiveOutcome = () => {
        const rand = Math.random();

        if (rand > 0.5) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div>
            <div style={{ margin: "100px auto", width: "80vw", maxHeight: "50vw", textAlign: "center" }}>

                {/* AGE & POSTCODE */}
                {panel === 1 &&
                    <>
                        <h1>Are you a Water Warrior?</h1>

                        <div style={{ marginTop: "100px" }}>
                            <h4>What's your postcode?</h4>
                            <Input placeholder="Eg. 2113"
                                onChange={(_e, { value }) => parseInt(value) ? setPostcode(parseInt(value)) : setPostcode(undefined)} />

                            <h4>How old are you?</h4>
                            <Input placeholder="Eg. 16"
                                onChange={(_e, { value }) => parseInt(value) ? setAge(parseInt(value)) : setAge(undefined)} />
                        </div>

                        <Button
                            className="ui button purple"
                            style={{ marginTop: "40px", backgroundColor: "#8189e8" }}
                            // color='olive'
                            content="Let's find out..."
                            // icon='arrow right'
                            label={{ basic: true, color: '#8189e8', pointing: 'left', content: "Next", icon: 'arrow right' }}
                            onClick={() => setPanel(2)}
                            disabled={!postcode || !age}
                        />
                    </>
                }

                {/* MAIN QUESTIONS */}
                {panel === 2 &&
                    <>
                        <h1>Are you a Water Warrior?</h1>

                        <div style={{ marginTop: "100px" }}>
                            <h4>How many minutes do you usually shower for?</h4>
                            <Input placeholder="Eg. 20" />

                            <h4>How many times a day do you wash your hands?</h4>
                            <Input placeholder="Eg. 8" />

                            <h4>Does your household use a front loader washing machine or top loader?</h4>
                            <Input placeholder="Eg. Top" />
                        </div>

                        <Button
                            className="ui button purple"
                            style={{ marginTop: "40px", backgroundColor: "#8189e8" }}
                            // color='olive'
                            content="Let's find out..."
                            // icon='arrow right'
                            label={{ basic: true, color: '#8189e8', pointing: 'left', content: "Next", icon: 'arrow right' }}
                            onClick={() => setPanel(3)}
                        />
                    </>
                }

                {/* CURRENT DAM STATUS */}
                {panel === 3 &&
                    <>
                        <h1>Here's what your closest dam looks like now ...</h1>

                        <div style={{
                            width: "300px", height: "300px", position: "relative",
                            border: "1px black solid", borderTop: "none", margin: "0 auto"
                        }}>
                            <div style={{
                                bottom: 0, height: "200px", width: "100%",
                                // backgroundColor: "blue",
                                position: "absolute"
                            }}>
                                <h1 style={{ position: "absolute", left: "125px" }}>30%</h1>
                                <Wave
                                    style={{ height: "100%" }}
                                    fill='#52bfff'
                                    paused={false}
                                    options={{
                                        height: 20,
                                        amplitude: 20,
                                        speed: 0.1,
                                        points: 3
                                    }}
                                />

                            </div>
                        </div>

                        <Button
                            className="ui button purple"
                            style={{ marginTop: "40px", backgroundColor: "#8189e8" }}
                            // color='olive'
                            content="Let's see what it will look like tomorrow..."
                            // icon='arrow right'
                            label={{ basic: true, color: '#8189e8', pointing: 'left', content: "Next", icon: 'arrow right' }}
                            onClick={() => setPanel(4)}
                        />
                    </>
                }

                {/* AFTER USAGE DAM LEVELS */}
                {panel === 4 &&
                    <>
                        <h1>If everyone in {getStateFromPostcode(postcode)} had the same usage as you, here's what would be left ...</h1>

                        {positiveOutcome() &&
                            <p role="img" aria-label="scared emoji" style={{ fontSize: "5rem", margin: 0 }}>
                                😨
                            </p>
                        }

                        <div style={{
                            width: "300px", height: "300px", position: "relative",
                            border: "1px black solid", borderTop: "none", margin: "0 auto"
                        }}>
                            <div style={{
                                bottom: 0, height: "50px", width: "100%",
                                // backgroundColor: "blue",
                                position: "absolute"
                            }}>
                                <h1 style={{ position: "absolute", left: "125px" }}>10%</h1>
                                <Wave
                                    style={{ height: "100%" }}
                                    fill='#52bfff'
                                    paused={false}
                                    options={{
                                        height: 20,
                                        amplitude: 20,
                                        speed: 0.1,
                                        points: 3
                                    }}
                                />

                            </div>
                        </div>

                        <Button
                            className="ui button purple"
                            style={{ marginTop: "40px", backgroundColor: "#8189e8" }}
                            // color='olive'
                            content="Help!"
                            // icon='arrow right'
                            label={{ basic: true, color: '#8189e8', pointing: 'left', content: "What can we do???", icon: 'arrow right' }}
                            onClick={() => setPanel(5)}
                        />
                    </>
                }

                {/* OUTCOME PANEL */}
                {panel === 5 &&
                    <>
                        {positiveOutcome() ?
                            <>
                                <h1>Congratulations! You are a Water Warrior!</h1>

                                <img src="./Thank-you-transparent.svg" height="400px" />

                                <div>
                                    <h3>for playing your part to help the {getStateFromPostcode(postcode)} community!</h3>
                                </div>
                            </>
                            :
                            <>
                                <h1>Australia's water resources are precious and limited.</h1>

                                <h1>Here's what we can do to help ... </h1>

                                <div style={{ minWidth: "300px", maxWidth: "600px", margin: "0 auto", fontSize: "20px" }}>
                                    <ul style={{}}>
                                        <li>Take shorter showers (Showers alone make up 26% of our water usage!)</li>
                                        <li>Don't use sprinklers (Sprinklers use 999 L of water an hour - and no, that's not a typo!)</li>
                                        <li>Always use the half-flush on a toilet where possible (20% of household water usage goes down the toilet ... literally)</li>
                                        <li>The next time you're buying a washing machine, get a front loader (front loaders use 65 L of water per load, while top loaders use 110 L of water per load!)</li>

                                    </ul>
                                </div>

                                <div style={{ marginTop: "40px" }}>
                                    <h2>Thank you for playing your part to help the {getStateFromPostcode(postcode)} community!</h2>
                                </div>
                            </>
                        }

                        <Button
                            className="ui button purple"
                            style={{ marginTop: "40px", backgroundColor: "#8189e8" }}
                            // color='olive'
                            content="Share this on Facebook"
                            // icon='arrow right'
                            label={{ basic: true, color: '#8189e8', pointing: 'left', content: "Let's raise awareness", icon: 'arrow right' }}
                            onClick={() => setPanel(2)}
                        />
                        <p>
                            <Button
                                // className="ui button purple"
                                style={{ marginTop: "40px" }}
                                color='teal'
                                content="Monitor dam levels"
                                // icon='arrow right'
                                label={{ basic: true, color: 'teal', pointing: 'left', content: "Notify me when it drops", icon: 'arrow right' }}
                                onClick={() => setPanel(2)}
                            />
                        </p>
                    </>
                }
            </div>

            <div style={{ minHeight: "50vh" }}>
                <Wave
                    style={{ height: "50vh" }}
                    fill='#52bfff'
                    paused={false}
                    options={{
                        height: 20,
                        amplitude: 20,
                        speed: 0.3,
                        points: 8
                    }}
                />
            </div>

        </div>
    )
}