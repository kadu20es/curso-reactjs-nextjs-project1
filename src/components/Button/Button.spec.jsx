import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from '.';

describe('<Button />', () => {
    it('should render de button with the text "Load more"', () => {
        render(<Button />);

        const button = screen.getByRole('button', {name: /load more/i});
        expect(button).toBeInTheDocument();
        //expect(screen.getByRole('button', { name: /load more/i }));

    })
});



/*
describe('<Button />', () => {
    it('should render de button with the text "Load more"', () => {
        render(<Button />);

        const button = screen.getByRole('button', {name: /load more/i});

    })
});*/