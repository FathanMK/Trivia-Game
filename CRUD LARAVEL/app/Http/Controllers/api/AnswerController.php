<?php

namespace App\Http\Controllers\api;

use App\Models\Answer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AnswerController extends Controller
{
    public function index()
    {
        try {
            $answers = Answer::all();
            return response()->json([
                'code' => 200,
                'data' => $answers
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                // 'question_id' => 'required|numeric',
                'answer' => 'required|string|max:255',
                'wrong_answer_1' => 'required|string|max:255',
                'wrong_answer_2' => 'required|string|max:255',
                'wrong_answer_3' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'code' => 400,
                    'message' => $validator->errors()
                ]);
            }

            Answer::create($request->all());
            return response()->json([
                'code' => 200,
                'message' => 'Answer created successfully',
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function show(string $id)
    {
        try {
            $answer = Answer::find($id);
            return response()->json([
                'code' => 200,
                'data' => $answer
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $answer = Answer::findOrFail($id);
            $validator = Validator::make($request->all(), [
                // 'question_id' => 'required|numeric',
                'answer' => 'required|string|max:255',
                'wrong_answer_1' => 'required|string|max:255',
                'wrong_answer_2' => 'required|string|max:255',
                'wrong_answer_3' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'code' => 400,
                    'message' => $validator->errors()
                ]);
            }

            $answer->update($request->all());
            return response()->json([
                'code' => 200,
                'message' => 'Answer updated successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(string $id)
    {
        try {
            Answer::findOrFail($id)->delete();
            return response()->json([
                'code' => 200,
                'message' => 'Answer deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }
}
