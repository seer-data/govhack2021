import * as React from "react";
import { useState } from "react";
import Wave from "react-wavify";
import { Button, Input, Message, Form as SemanticForm, Dropdown, Label, Icon } from "semantic-ui-react";
import { Form, Field } from "react-final-form";

const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const getStateFromPostcode = (postcode) => {
    if (postcode >= 3000) {
        return "VIC";
    } else if (postcode >= 2000) {
        return "NSW";
    } else {
        return "NSW";
    }
}

const FieldInput = ({ input, meta, label, placeholder }) => (
  <div style={{ marginBottom: "1rem" }}>
    <h4>{label}</h4>
    <SemanticForm.Input
      {...input}
      placeholder={placeholder || ""}
      error={(meta.error && meta.touched) ? { content: meta.error, pointing: "above" } : undefined}
    />
  </div>
);

const FieldSelect = ({ input, meta, label, placeholder, options }) => (
  <div style={{ marginBottom: "1rem" }}>
    <h4>{label}</h4>
    <Dropdown
      {...input}
      onChange={(_, data) => {
        console.log(data);
        input.onChange(data?.value);
      }}
      selection
      options={options}
      placeholder={placeholder || ""}
      error={meta.error && meta.touched}
    />
  </div>
);

const constants = {
  sydneyPopulation: 5312163, // people
  sydneyPopDensity: 430, // people per square km
  usageData: {
    regularShowerhead: 10, // L/min
    efficientShowerhead: 6.5, // L/min
    frontLoader: 65, // L per wash
    topLoader: 110, // L per wash
    handWashing: 2, // L for a 30 second hand washing
  }
};

const damData = {
  "Woronora Dam": {
    volume: 57854,
    capacity: 71790, // capacity
  },
  "Warragamba Dam": {
    volume: 1955246,
    capacity: 2027000,
  }
}

const getClosestDam = (postcode) => {
  const closest = "Woronora Dam";
  return damData[closest];
}

export const GameWelcome = () => {

    const [panel, setPanel] = useState(1);
    const [formData, setFormData] = useState<any>({});
    const { postcode, age, showerMinutes, timesHandsWashed, washingType } = formData || {};
    const closestDam = getClosestDam(postcode || 2000);
    const damPercentFull = Math.round(closestDam.volume / closestDam.capacity * 100);
    console.log(formData);

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

              <div style={{ width: 600, margin: "0 auto" }}>
                {/* AGE & POSTCODE */}
                {panel === 1 &&
                <Form
                  // initialValues={{ postcode: 3000, age: 18 }}
                  onSubmit={values => {
                    console.log(values);
                    setFormData({ ...formData, ...values });
                    setPanel(2);
                  }}
                  render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <SemanticForm onSubmit={handleSubmit}>
                      <h1>Are you a Water Warrior?</h1>
                      <Message color="blue">
                        Learn about how to save water!
                      </Message>

                      <div style={{ marginTop: "100px" }}>
                        <Field
                          name="postcode"
                          label="What's your postcode?"
                          validate={composeValidators(required, mustBeNumber)}
                          component={FieldInput}
                          placeholder="Eg. 2113"
                          type="number"
                        />

                        <Field
                          name="age"
                          label="How old are you?"
                          validate={composeValidators(required, mustBeNumber)}
                          component={FieldInput}
                          placeholder="Eg. 16"
                          type="number"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="ui button purple"
                        style={{ marginTop: "40px", backgroundColor: "#8189e8" }}
                        // color='olive'
                        content="Let's find out..."
                        // icon='arrow right'
                        label={{ basic: true, color: '#8189e8', pointing: 'left', content: "Next", icon: 'arrow right' }}
                        disabled={!values.postcode || !values.age}
                      />
                    </SemanticForm>
                  )}
                />
                }
              </div>

              <div style={{ width: 600, margin: "0 auto" }}>
                {/* MAIN QUESTIONS */}
                {panel === 2 &&
                <Form
                  // initialValues={{ showerMinutes: 10, timesHandsWashed: 18, washingType: "Top-Loader" }}
                  onSubmit={values => {
                    console.log(values);
                    setFormData({ ...formData, ...values });
                    setPanel(3);
                  }}
                  render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <SemanticForm onSubmit={handleSubmit}>
                      <h1>Are you a Water Warrior?</h1>

                      <div style={{ marginTop: "100px" }}>
                        <Field
                          name="showerMinutes"
                          label="How many minutes do you usually shower for?"
                          validate={composeValidators(required, mustBeNumber)}
                          component={FieldInput}
                          placeholder="Eg. 20"
                          type="number"
                        />
                        <Field
                          name="timesHandsWashed"
                          label="How many times a day do you wash your hands?"
                          validate={composeValidators(required, mustBeNumber)}
                          component={FieldInput}
                          placeholder="Eg. 8"
                          type="number"
                        />
                        <Field
                          name="washingType"
                          label="Does your household use a front loader washing machine or top loader?"
                          validate={composeValidators(required)}
                          component={FieldSelect}
                          placeholder="Eg. Top"
                          options={[
                            { key: "Top-Loader", text: "Top-Loader", value: "Top-Loader" },
                            { key: "Front-Loader", text: "Front-Loader", value: "Front-Loader" }
                          ]}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="ui button purple"
                        style={{ marginTop: "40px", backgroundColor: "#8189e8" }}
                        // color='olive'
                        content="Let's find out..."
                        // icon='arrow right'
                        label={{ basic: true, color: '#8189e8', pointing: 'left', content: "Next", icon: 'arrow right' }}
                        disabled={!values.showerMinutes || !values.timesHandsWashed || !values.washingType}
                      />
                    </SemanticForm>
                  )}
                />
                }
              </div>

                {/* CURRENT DAM STATUS */}
                {panel === 3 &&
                    <>
                        <h1>Here's what your closest dam looks like now ...</h1>

                        <div style={{
                            width: "300px", height: "300px", position: "relative",
                            border: "1px black solid", borderTop: "none", margin: "0 auto"
                        }}>
                            <div style={{
                                bottom: 0, height: "100%", width: "100%",
                                // backgroundColor: "blue",
                                position: "absolute"
                            }}>
                              <Label style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} color="blue">
                                <Icon name="tint" />{damPercentFull}%
                              </Label>
                                <Wave
                                    style={{ height: "100%" }}
                                    fill='#52bfff'
                                    paused={false}
                                    options={{
                                        height: damPercentFull,
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
