import ReactGA from "react-ga4";

export const initGA = () => {
    ReactGA.initialize("G-JCJC4X90CS");
};

export const logPageView = (page: string) => {
    ReactGA.send({ hitType: "pageview", page });
};

export const logEvent = (category: string, action: string, label?: string) => {
    ReactGA.event({ category, action, label });
};

export const trackEvent = (
    action: string,
    category: string,
    label?: string
) => {
    ReactGA.event({
        category,
        action,
        label,
    });
};