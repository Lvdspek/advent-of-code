string symbols = "/!@#$%^&*()-_=+";
string numbers = "0123456789";
Dictionary<int, List<int>> numberIndices = new();
var schematicLines = new List<string>();

using (var sr = new StreamReader("input.txt"))
{
    string? line = sr.ReadLine();
    int lineCount = 0;

    while (line != null) // && lineCount < 3)
    {
        Console.WriteLine($"Current line: {line}");
        schematicLines.Add(line);
        line = sr.ReadLine();
        lineCount++;
    }

    numberIndices = GetNumberIndices(schematicLines);
    var partNumbers = GetPartNumbers(numberIndices);
    Console.WriteLine($"Sum of part numbers: {partNumbers.Sum()}");


}

Dictionary<int, List<int>> GetNumberIndices(List<string> lines)
{
    Dictionary<int, List<int>> indices = new();

    for (int lineIndex = 0; lineIndex < lines.Count; lineIndex++)
    {
        string? schematicLine = lines[lineIndex];

        for (int columnIndex = 0; columnIndex < schematicLine.Length; columnIndex++)
        {
            var character = schematicLine[columnIndex];
            if (numbers.Contains(character))
            {
                if (!indices.ContainsKey(lineIndex))
                {
                    indices.Add(lineIndex, new());
                }
                indices[lineIndex].Add(columnIndex);
            }
        }
    }

    return indices;
}

List<int> GetPartNumbers(Dictionary<int, List<int>> numberIndices)
{
    List<int> partsNumbers = new();
    foreach (var rowIndex in numberIndices.Keys)
    {
        string currentNumber = string.Empty;
        int previousIndex = 0;
        bool symbolAdjacent = false;

        foreach (var columnIndex in numberIndices[rowIndex])
        {
            if (previousIndex == columnIndex - 1 || previousIndex == 0)
            {
                currentNumber += schematicLines[rowIndex][columnIndex];
                symbolAdjacent |= AnyAdjecentSymbols(columnIndex, rowIndex);
            }
            else
            {
                if (symbolAdjacent)
                {
                    partsNumbers.Add(int.Parse(currentNumber));
                    Console.WriteLine($"Added {currentNumber}");
                }
                else
                {
                    Console.WriteLine($"Did NOT add {currentNumber}");
                }

                currentNumber = string.Empty + schematicLines[rowIndex][columnIndex];
                symbolAdjacent = AnyAdjecentSymbols(columnIndex, rowIndex);
            }

            previousIndex = columnIndex;
        }

        if (symbolAdjacent)
        {
            partsNumbers.Add(int.Parse(currentNumber));
            Console.WriteLine($"Added {currentNumber}");
        }
        else
        {
            Console.WriteLine($"Did NOT add {currentNumber}");
        }
        currentNumber = string.Empty;
    }

    return partsNumbers;
}

Coordinate AnyGearSymbols(int colIndex, int rowIndex)
{
    string nonSymbols = numbers + ".";
    if (schematicLines == null) return new Coordinate { X = -1, Y = -1 };

    if (colIndex > 0 && rowIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex - 1][colIndex - 1]))
        return new Coordinate { X = colIndex - 1, Y = rowIndex - 1 };
    if (rowIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex - 1][colIndex]))
        return new Coordinate { X = colIndex, Y = rowIndex - 1 };
    if (colIndex < schematicLines[0].Length - 1 && rowIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex - 1][colIndex + 1]))
        return new Coordinate { X = colIndex + 1, Y = rowIndex - 1 };
    if (colIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex][colIndex - 1]))
        return new Coordinate { X = colIndex - 1, Y = rowIndex };
    if (colIndex < schematicLines[0].Length - 1 && !nonSymbols.Contains(schematicLines[rowIndex][colIndex + 1]))
        return new Coordinate { X = colIndex + 1, Y = rowIndex };
    if (rowIndex < schematicLines.Count - 1 && colIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex + 1][colIndex - 1]))
        return new Coordinate { X = colIndex - 1, Y = rowIndex + 1 };
    if (rowIndex < schematicLines.Count - 1 && !nonSymbols.Contains(schematicLines[rowIndex + 1][colIndex]))
        return new Coordinate { X = colIndex, Y = rowIndex + 1 };
    if (rowIndex < schematicLines.Count - 1 && colIndex < schematicLines[0].Length - 1 && !nonSymbols.Contains(schematicLines[rowIndex + 1][colIndex + 1]))
        return new Coordinate { X = colIndex + 1, Y = rowIndex + 1 };

    return new Coordinate { X = -1, Y = -1 };
}

bool AnyAdjecentSymbols(int colIndex, int rowIndex)
{
    string nonSymbols = numbers + ".";
    if (schematicLines == null) return false;

    if ((colIndex > 0 && rowIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex - 1][colIndex - 1])) ||
        (rowIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex - 1][colIndex])) ||
        (colIndex < schematicLines[0].Length - 1 && rowIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex - 1][colIndex + 1])) ||
        (colIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex][colIndex - 1])) ||
        (colIndex < schematicLines[0].Length - 1 && !nonSymbols.Contains(schematicLines[rowIndex][colIndex + 1])) ||
        (rowIndex < schematicLines.Count - 1 && colIndex > 0 && !nonSymbols.Contains(schematicLines[rowIndex + 1][colIndex - 1])) ||
        (rowIndex < schematicLines.Count - 1 && !nonSymbols.Contains(schematicLines[rowIndex + 1][colIndex])) ||
        (rowIndex < schematicLines.Count - 1 && colIndex < schematicLines[0].Length - 1 && !nonSymbols.Contains(schematicLines[rowIndex + 1][colIndex + 1])))
        return true;

    return false;
}