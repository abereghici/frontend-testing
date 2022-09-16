import {Navigate as MockNavigate} from 'react-router-dom';
import {fireEvent, render, screen, waitFor} from '../test';
import {Editor} from './PostEditor';
import {savePost} from '../api';

// TODO: fix types once https://github.com/aelbore/esbuild-jest/issues/57 is fixed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const savePostMock = savePost as jest.MockedFunction<any>;

jest.mock('react-router', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Navigate: jest.fn(() => {}),
  };
});

jest.mock('../api');

afterEach(() => {
  jest.clearAllMocks();
});

function renderEditor() {
  const fakeUser = {id: 'user-1'};
  const fakePost = {
    title: 'Test Title',
    content: 'Test Content',
    tags: ['tag1', 'tag2'],
  };

  render(<Editor user={fakeUser} />);

  screen.getByLabelText<HTMLInputElement>(/title/i).value = fakePost.title;
  screen.getByLabelText<HTMLTextAreaElement>(/content/i).value =
    fakePost.content;
  screen.getByLabelText<HTMLInputElement>(/tags/i).value =
    fakePost.tags.join(',');
  const submitButton = screen.getByText(/submit/i);

  return {submitButton, fakeUser, fakePost};
}

test('renders a form with title, content, tags, and a submit button', async () => {
  savePostMock.mockResolvedValueOnce();

  const preDate = new Date().getTime();
  const {submitButton, fakePost, fakeUser} = renderEditor();

  fireEvent.click(submitButton);

  expect(submitButton).toBeDisabled();
  expect(savePostMock).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  });
  expect(savePostMock).toHaveBeenCalledTimes(1);

  const postDate = new Date().getTime();
  const date = new Date(savePostMock.mock.calls[0][0].date).getTime();

  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);

  await waitFor(() => {
    expect(MockNavigate).toHaveBeenCalledWith({to: `/`}, {});
  });
});

test('renders an error message from the server', async () => {
  const testError = 'test error';
  savePostMock.mockRejectedValueOnce({data: {error: testError}});
  const {submitButton} = renderEditor();

  fireEvent.click(submitButton);

  const postError = await screen.findByRole('alert');
  expect(postError).toHaveTextContent(testError);
  expect(submitButton).not.toBeDisabled();
});
