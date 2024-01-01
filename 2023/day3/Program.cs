string numbers = "0123456789";
Dictionary<int, List<int>> numberIndices = new();
List<Coordinate> starPoints = new();
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

    List<int> gearIndices = new();
    int gearSum = 0;
    for (int i = 0; i < starPoints.Count; i++)
    {
        if (!gearIndices.Contains(i) && starPoints.Count(s => s.X == starPoints[i].X && s.Y == starPoints[i].Y) == 2)
        {
            var otherIndex = starPoints.IndexOf(starPoints.Last(s => s.X == starPoints[i].X && s.Y == starPoints[i].Y));
            gearSum += partNumbers[i] * partNumbers[otherIndex];
            gearIndices.Add(i);
            gearIndices.Add(otherIndex);
        }
    }

    Console.WriteLine($"Gear sum: {gearSum}");
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
        // bool symbolAdjacent = false;
        bool hasStarPointAdjacent = false;
        Coordinate? starPoint = null;

        foreach (var columnIndex in numberIndices[rowIndex])
        {
            if (previousIndex == columnIndex - 1 || previousIndex == 0)
            {
                currentNumber += schematicLines[rowIndex][columnIndex];
                // symbolAdjacent |= AnyAdjecentSymbols(columnIndex, rowIndex);
                starPoint = AnyGearSymbols(columnIndex, rowIndex);
                if (!hasStarPointAdjacent && starPoint.X != -1 && starPoint.Y != -1)
                {
                    starPoints.Add(starPoint);
                    hasStarPointAdjacent = true;
                }
            }
            else
            {
                if (hasStarPointAdjacent)
                {
                    partsNumbers.Add(int.Parse(currentNumber));
                    Console.WriteLine($"Added {currentNumber}");
                }
                else
                {
                    Console.WriteLine($"Did NOT add {currentNumber}");
                }
                hasStarPointAdjacent = false;
                currentNumber = string.Empty + schematicLines[rowIndex][columnIndex];

                starPoint = AnyGearSymbols(columnIndex, rowIndex);
                if (!hasStarPointAdjacent && starPoint.X != -1 && starPoint.Y != -1)
                {
                    starPoints.Add(starPoint);
                    hasStarPointAdjacent = true;
                }
            }

            previousIndex = columnIndex;
        }

        if (hasStarPointAdjacent)
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