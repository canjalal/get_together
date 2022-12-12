import { EventErrors } from "./EventErrors";

<div id="event-submit-bar">
                <div>
                    <button className="back-button" onClick={() => navigate(`/groups/${groupId}`)}>Cancel</button>
                </div>
                <div>
                    <button className="standard-button" id="next-button" onClick={(e) => submitEvent(e).catch(
                    async (res) => { // not correctly catching error 422, re-renders a blank page (not what we want)
                    let data;
                    try {
                        // .clone() essentially allows you to read the response body twice
                        data = await res.clone().json();
                    } catch {
                        data = await res.text(); // Will hit this case if, e.g., server is down
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                    }
                )}>{oldEvent.method ? "Publish" : "Save Changes"}</button>
                {errors.length > 0 && <EventErrors errors={errors} />
                }
                </div>
            </div>